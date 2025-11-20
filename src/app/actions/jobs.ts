'use server';

import { db } from '@/db';
import { jobs, jobSkills, clientProfiles, proposals } from '@/db/schema';
import { eq, and, or, like, desc, sql } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const createJobSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  categoryId: z.string().uuid().optional(),
  budget: z.string().optional(),
  budgetType: z.enum(['fixed', 'hourly']),
  location: z.string().optional(),
  remote: z.boolean().default(false),
  experienceLevel: z.enum(['entry', 'intermediate', 'expert']).optional(),
  duration: z.enum(['short', 'medium', 'long']).optional(),
  skills: z.array(z.string().uuid()).optional(),
});

export async function createJob(data: z.infer<typeof createJobSchema>) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = createJobSchema.parse(data);

    // Get client profile
    const clientProfile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, session.user.id),
    });

    if (!clientProfile) {
      return { success: false, error: 'Client profile not found' };
    }

    // Create job
    const [newJob] = await db.insert(jobs).values({
      clientId: clientProfile.id,
      title: validated.title,
      description: validated.description,
      categoryId: validated.categoryId,
      budget: validated.budget,
      budgetType: validated.budgetType,
      location: validated.location,
      remote: validated.remote,
      experienceLevel: validated.experienceLevel,
      duration: validated.duration,
    }).returning();

    // Add skills to job
    if (validated.skills && validated.skills.length > 0) {
      await db.insert(jobSkills).values(
        validated.skills.map(skillId => ({
          jobId: newJob.id,
          skillId,
        }))
      );
    }

    // Update client's posted jobs count
    await db.update(clientProfiles)
      .set({
        postedJobs: sql`${clientProfiles.postedJobs} + 1`,
      })
      .where(eq(clientProfiles.id, clientProfile.id));

    return { success: true, jobId: newJob.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to create job' };
  }
}

const updateJobSchema = createJobSchema.extend({
  id: z.string().uuid(),
  status: z.enum(['open', 'in_progress', 'completed', 'cancelled']).optional(),
});

export async function updateJob(data: z.infer<typeof updateJobSchema>) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = updateJobSchema.parse(data);

    // Get client profile
    const clientProfile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, session.user.id),
    });

    if (!clientProfile) {
      return { success: false, error: 'Client profile not found' };
    }

    // Check if job belongs to client
    const job = await db.query.jobs.findFirst({
      where: and(
        eq(jobs.id, validated.id),
        eq(jobs.clientId, clientProfile.id)
      ),
    });

    if (!job) {
      return { success: false, error: 'Job not found or unauthorized' };
    }

    // Update job
    await db.update(jobs)
      .set({
        title: validated.title,
        description: validated.description,
        categoryId: validated.categoryId,
        budget: validated.budget,
        budgetType: validated.budgetType,
        location: validated.location,
        remote: validated.remote,
        experienceLevel: validated.experienceLevel,
        duration: validated.duration,
        status: validated.status,
        updatedAt: new Date(),
      })
      .where(eq(jobs.id, validated.id));

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to update job' };
  }
}

const searchJobsSchema = z.object({
  query: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  budgetType: z.enum(['fixed', 'hourly']).optional(),
  experienceLevel: z.enum(['entry', 'intermediate', 'expert']).optional(),
  remote: z.boolean().optional(),
  skills: z.array(z.string().uuid()).optional(),
  limit: z.number().default(20),
  offset: z.number().default(0),
});

export async function searchJobs(data: z.infer<typeof searchJobsSchema>) {
  try {
    const validated = searchJobsSchema.parse(data);

    let whereConditions: any[] = [eq(jobs.status, 'open')];

    if (validated.query) {
      whereConditions.push(
        or(
          like(jobs.title, `%${validated.query}%`),
          like(jobs.description, `%${validated.query}%`)
        )
      );
    }

    if (validated.categoryId) {
      whereConditions.push(eq(jobs.categoryId, validated.categoryId));
    }

    if (validated.budgetType) {
      whereConditions.push(eq(jobs.budgetType, validated.budgetType));
    }

    if (validated.experienceLevel) {
      whereConditions.push(eq(jobs.experienceLevel, validated.experienceLevel));
    }

    if (validated.remote !== undefined) {
      whereConditions.push(eq(jobs.remote, validated.remote));
    }

    const results = await db.query.jobs.findMany({
      where: and(...whereConditions),
      with: {
        client: {
          with: {
            user: true,
          },
        },
        category: true,
        skills: {
          with: {
            skill: true,
          },
        },
      },
      limit: validated.limit,
      offset: validated.offset,
      orderBy: [desc(jobs.postedAt)],
    });

    return { success: true, jobs: results };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message, jobs: [] };
    }
    return { success: false, error: 'Failed to search jobs', jobs: [] };
  }
}

export async function getJobById(jobId: string) {
  try {
    // Increment view count
    await db.update(jobs)
      .set({
        viewCount: sql`${jobs.viewCount} + 1`,
      })
      .where(eq(jobs.id, jobId));

    const job = await db.query.jobs.findFirst({
      where: eq(jobs.id, jobId),
      with: {
        client: {
          with: {
            user: true,
          },
        },
        category: true,
        skills: {
          with: {
            skill: true,
          },
        },
      },
    });

    return job;
  } catch {
    return null;
  }
}

export async function getMyJobs() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    const clientProfile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, session.user.id),
    });

    if (!clientProfile) {
      return [];
    }

    const myJobs = await db.query.jobs.findMany({
      where: eq(jobs.clientId, clientProfile.id),
      with: {
        category: true,
        skills: {
          with: {
            skill: true,
          },
        },
      },
      orderBy: [desc(jobs.postedAt)],
    });

    return myJobs;
  } catch {
    return [];
  }
}

export async function deleteJob(jobId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const clientProfile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, session.user.id),
    });

    if (!clientProfile) {
      return { success: false, error: 'Client profile not found' };
    }

    // Check if job belongs to client
    const job = await db.query.jobs.findFirst({
      where: and(
        eq(jobs.id, jobId),
        eq(jobs.clientId, clientProfile.id)
      ),
    });

    if (!job) {
      return { success: false, error: 'Job not found or unauthorized' };
    }

    // Delete job (cascades to related records)
    await db.delete(jobs).where(eq(jobs.id, jobId));

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to delete job' };
  }
}
