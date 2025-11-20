'use server';

import { db } from '@/db';
import { freelancerProfiles, freelancerSkills, portfolioItems, skills } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const updateFreelancerProfileSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  bio: z.string().optional(),
  hourlyRate: z.string().optional(),
  availability: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  github: z.string().optional(),
  linkedin: z.string().optional(),
});

export async function updateFreelancerProfile(data: z.infer<typeof updateFreelancerProfileSchema>) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = updateFreelancerProfileSchema.parse(data);

    const profile = await db.query.freelancerProfiles.findFirst({
      where: eq(freelancerProfiles.userId, session.user.id),
    });

    if (!profile) {
      return { success: false, error: 'Freelancer profile not found' };
    }

    await db.update(freelancerProfiles)
      .set({
        ...validated,
        updatedAt: new Date(),
      })
      .where(eq(freelancerProfiles.id, profile.id));

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to update profile' };
  }
}

export async function getFreelancerProfile(userId: string) {
  try {
    const profile = await db.query.freelancerProfiles.findFirst({
      where: eq(freelancerProfiles.userId, userId),
      with: {
        user: true,
        skills: {
          with: {
            skill: true,
          },
        },
        portfolio: true,
      },
    });

    return profile;
  } catch {
    return null;
  }
}

const addSkillSchema = z.object({
  skillId: z.string().uuid(),
  yearsOfExperience: z.number().min(0).optional(),
});

export async function addSkillToFreelancer(data: z.infer<typeof addSkillSchema>) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = addSkillSchema.parse(data);

    const profile = await db.query.freelancerProfiles.findFirst({
      where: eq(freelancerProfiles.userId, session.user.id),
    });

    if (!profile) {
      return { success: false, error: 'Freelancer profile not found' };
    }

    await db.insert(freelancerSkills).values({
      freelancerId: profile.id,
      skillId: validated.skillId,
      yearsOfExperience: validated.yearsOfExperience,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to add skill' };
  }
}

const addPortfolioItemSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
  completedAt: z.date().optional(),
});

export async function addPortfolioItem(data: z.infer<typeof addPortfolioItemSchema>) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = addPortfolioItemSchema.parse(data);

    const profile = await db.query.freelancerProfiles.findFirst({
      where: eq(freelancerProfiles.userId, session.user.id),
    });

    if (!profile) {
      return { success: false, error: 'Freelancer profile not found' };
    }

    const [item] = await db.insert(portfolioItems).values({
      freelancerId: profile.id,
      ...validated,
    }).returning();

    return { success: true, itemId: item.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to add portfolio item' };
  }
}

export async function getAllSkills() {
  try {
    return await db.query.skills.findMany({
      with: {
        category: true,
      },
    });
  } catch {
    return [];
  }
}
