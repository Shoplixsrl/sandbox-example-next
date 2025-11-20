'use server';

import { db } from '@/db';
import { proposals, freelancerProfiles, jobs, contracts, clientProfiles } from '@/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const createProposalSchema = z.object({
  jobId: z.string().uuid(),
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
  proposedRate: z.string().min(1, 'Proposed rate is required'),
  estimatedDuration: z.string().optional(),
});

export async function createProposal(data: z.infer<typeof createProposalSchema>) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = createProposalSchema.parse(data);

    // Get freelancer profile
    const freelancerProfile = await db.query.freelancerProfiles.findFirst({
      where: eq(freelancerProfiles.userId, session.user.id),
    });

    if (!freelancerProfile) {
      return { success: false, error: 'Freelancer profile not found' };
    }

    // Check if job exists and is open
    const job = await db.query.jobs.findFirst({
      where: eq(jobs.id, validated.jobId),
    });

    if (!job) {
      return { success: false, error: 'Job not found' };
    }

    if (job.status !== 'open') {
      return { success: false, error: 'Job is no longer accepting proposals' };
    }

    // Check if already submitted proposal for this job
    const existingProposal = await db.query.proposals.findFirst({
      where: and(
        eq(proposals.jobId, validated.jobId),
        eq(proposals.freelancerId, freelancerProfile.id)
      ),
    });

    if (existingProposal) {
      return { success: false, error: 'You have already submitted a proposal for this job' };
    }

    // Create proposal
    const [newProposal] = await db.insert(proposals).values({
      jobId: validated.jobId,
      freelancerId: freelancerProfile.id,
      coverLetter: validated.coverLetter,
      proposedRate: validated.proposedRate,
      estimatedDuration: validated.estimatedDuration,
    }).returning();

    // Update job proposal count
    await db.update(jobs)
      .set({
        proposalCount: sql`${jobs.proposalCount} + 1`,
      })
      .where(eq(jobs.id, validated.jobId));

    return { success: true, proposalId: newProposal.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to create proposal' };
  }
}

export async function getProposalsForJob(jobId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    // Verify user owns the job
    const clientProfile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, session.user.id),
    });

    if (!clientProfile) {
      return [];
    }

    const job = await db.query.jobs.findFirst({
      where: and(
        eq(jobs.id, jobId),
        eq(jobs.clientId, clientProfile.id)
      ),
    });

    if (!job) {
      return [];
    }

    const jobProposals = await db.query.proposals.findMany({
      where: eq(proposals.jobId, jobId),
      with: {
        freelancer: {
          with: {
            user: true,
            skills: {
              with: {
                skill: true,
              },
            },
          },
        },
      },
      orderBy: [desc(proposals.submittedAt)],
    });

    return jobProposals;
  } catch {
    return [];
  }
}

export async function getMyProposals() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    const freelancerProfile = await db.query.freelancerProfiles.findFirst({
      where: eq(freelancerProfiles.userId, session.user.id),
    });

    if (!freelancerProfile) {
      return [];
    }

    const myProposals = await db.query.proposals.findMany({
      where: eq(proposals.freelancerId, freelancerProfile.id),
      with: {
        job: {
          with: {
            client: {
              with: {
                user: true,
              },
            },
            category: true,
          },
        },
      },
      orderBy: [desc(proposals.submittedAt)],
    });

    return myProposals;
  } catch {
    return [];
  }
}

export async function acceptProposal(proposalId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Get client profile
    const clientProfile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, session.user.id),
    });

    if (!clientProfile) {
      return { success: false, error: 'Client profile not found' };
    }

    // Get proposal with job
    const proposal = await db.query.proposals.findFirst({
      where: eq(proposals.id, proposalId),
      with: {
        job: true,
      },
    });

    if (!proposal) {
      return { success: false, error: 'Proposal not found' };
    }

    // Verify client owns the job
    if (proposal.job.clientId !== clientProfile.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Update proposal status
    await db.update(proposals)
      .set({
        status: 'accepted',
        updatedAt: new Date(),
      })
      .where(eq(proposals.id, proposalId));

    // Create contract
    const [contract] = await db.insert(contracts).values({
      jobId: proposal.jobId,
      proposalId: proposal.id,
      clientId: clientProfile.id,
      freelancerId: proposal.freelancerId,
      title: proposal.job.title,
      description: proposal.job.description,
      amount: proposal.proposedRate,
    }).returning();

    // Update job status
    await db.update(jobs)
      .set({
        status: 'in_progress',
        updatedAt: new Date(),
      })
      .where(eq(jobs.id, proposal.jobId));

    return { success: true, contractId: contract.id };
  } catch {
    return { success: false, error: 'Failed to accept proposal' };
  }
}

export async function rejectProposal(proposalId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Get client profile
    const clientProfile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, session.user.id),
    });

    if (!clientProfile) {
      return { success: false, error: 'Client profile not found' };
    }

    // Get proposal with job
    const proposal = await db.query.proposals.findFirst({
      where: eq(proposals.id, proposalId),
      with: {
        job: true,
      },
    });

    if (!proposal) {
      return { success: false, error: 'Proposal not found' };
    }

    // Verify client owns the job
    if (proposal.job.clientId !== clientProfile.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Update proposal status
    await db.update(proposals)
      .set({
        status: 'rejected',
        updatedAt: new Date(),
      })
      .where(eq(proposals.id, proposalId));

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to reject proposal' };
  }
}

export async function withdrawProposal(proposalId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const freelancerProfile = await db.query.freelancerProfiles.findFirst({
      where: eq(freelancerProfiles.userId, session.user.id),
    });

    if (!freelancerProfile) {
      return { success: false, error: 'Freelancer profile not found' };
    }

    // Get proposal
    const proposal = await db.query.proposals.findFirst({
      where: and(
        eq(proposals.id, proposalId),
        eq(proposals.freelancerId, freelancerProfile.id)
      ),
    });

    if (!proposal) {
      return { success: false, error: 'Proposal not found or unauthorized' };
    }

    if (proposal.status !== 'pending') {
      return { success: false, error: 'Can only withdraw pending proposals' };
    }

    // Update proposal status
    await db.update(proposals)
      .set({
        status: 'withdrawn',
        updatedAt: new Date(),
      })
      .where(eq(proposals.id, proposalId));

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to withdraw proposal' };
  }
}
