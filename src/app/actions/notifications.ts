'use server';

import { db } from '@/db';
import { notifications } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const createNotificationSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(['message', 'proposal', 'job', 'payment', 'review', 'system']),
  title: z.string(),
  message: z.string(),
  link: z.string().optional(),
});

export async function createNotification(data: z.infer<typeof createNotificationSchema>) {
  try {
    const validated = createNotificationSchema.parse(data);

    await db.insert(notifications).values(validated);

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to create notification' };
  }
}

export async function getMyNotifications() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    const myNotifications = await db.query.notifications.findMany({
      where: eq(notifications.userId, session.user.id),
      orderBy: [desc(notifications.createdAt)],
      limit: 50,
    });

    return myNotifications;
  } catch {
    return [];
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    await db.update(notifications)
      .set({ read: true })
      .where(
        and(
          eq(notifications.id, notificationId),
          eq(notifications.userId, session.user.id)
        )
      );

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to mark notification as read' };
  }
}

export async function markAllNotificationsAsRead() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    await db.update(notifications)
      .set({ read: true })
      .where(
        and(
          eq(notifications.userId, session.user.id),
          eq(notifications.read, false)
        )
      );

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to mark notifications as read' };
  }
}
