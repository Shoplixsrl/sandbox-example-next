'use server';

import { db } from '@/db';
import { clientProfiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const updateClientProfileSchema = z.object({
  companyName: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

export async function updateClientProfile(data: z.infer<typeof updateClientProfileSchema>) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = updateClientProfileSchema.parse(data);

    const profile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, session.user.id),
    });

    if (!profile) {
      return { success: false, error: 'Client profile not found' };
    }

    await db.update(clientProfiles)
      .set({
        ...validated,
        updatedAt: new Date(),
      })
      .where(eq(clientProfiles.id, profile.id));

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to update profile' };
  }
}

export async function getClientProfile(userId: string) {
  try {
    const profile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, userId),
      with: {
        user: true,
        jobs: true,
      },
    });

    return profile;
  } catch {
    return null;
  }
}
