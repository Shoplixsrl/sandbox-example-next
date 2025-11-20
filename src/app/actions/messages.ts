'use server';

import { db } from '@/db';
import { messages } from '@/db/schema';
import { eq, and, or, desc } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const sendMessageSchema = z.object({
  receiverId: z.string().uuid(),
  content: z.string().min(1, 'Message cannot be empty'),
});

export async function sendMessage(data: z.infer<typeof sendMessageSchema>) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = sendMessageSchema.parse(data);

    const [message] = await db.insert(messages).values({
      senderId: session.user.id,
      receiverId: validated.receiverId,
      content: validated.content,
    }).returning();

    return { success: true, messageId: message.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to send message' };
  }
}

export async function getConversation(otherUserId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    const conversation = await db.query.messages.findMany({
      where: or(
        and(
          eq(messages.senderId, session.user.id),
          eq(messages.receiverId, otherUserId)
        ),
        and(
          eq(messages.senderId, otherUserId),
          eq(messages.receiverId, session.user.id)
        )
      ),
      orderBy: [desc(messages.createdAt)],
      limit: 100,
    });

    // Mark messages as read
    await db.update(messages)
      .set({ read: true })
      .where(
        and(
          eq(messages.receiverId, session.user.id),
          eq(messages.senderId, otherUserId),
          eq(messages.read, false)
        )
      );

    return conversation.reverse();
  } catch {
    return [];
  }
}

export async function getConversations() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    // Get all unique conversation partners
    const sent = await db.query.messages.findMany({
      where: eq(messages.senderId, session.user.id),
    });

    const received = await db.query.messages.findMany({
      where: eq(messages.receiverId, session.user.id),
    });

    const partnerIds = new Set([
      ...sent.map(m => m.receiverId),
      ...received.map(m => m.senderId),
    ]);

    const conversations = await Promise.all(
      Array.from(partnerIds).map(async (partnerId) => {
        const lastMessage = await db.query.messages.findFirst({
          where: or(
            and(
              eq(messages.senderId, session.user.id),
              eq(messages.receiverId, partnerId)
            ),
            and(
              eq(messages.senderId, partnerId),
              eq(messages.receiverId, session.user.id)
            )
          ),
          orderBy: [desc(messages.createdAt)],
        });

        const unreadCount = await db.query.messages.findMany({
          where: and(
            eq(messages.senderId, partnerId),
            eq(messages.receiverId, session.user.id),
            eq(messages.read, false)
          ),
        });

        return {
          partnerId,
          lastMessage,
          unreadCount: unreadCount.length,
        };
      })
    );

    return conversations.sort((a, b) => {
      const aTime = a.lastMessage?.createdAt?.getTime() || 0;
      const bTime = b.lastMessage?.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  } catch {
    return [];
  }
}
