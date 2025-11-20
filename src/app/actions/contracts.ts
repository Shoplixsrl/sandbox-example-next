'use server';

import { db } from '@/db';
import { contracts, freelancerProfiles, clientProfiles, jobs, payments } from '@/db/schema';
import { eq, or, and, desc, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function getMyContracts() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    const freelancerProfile = await db.query.freelancerProfiles.findFirst({
      where: eq(freelancerProfiles.userId, session.user.id),
    });

    const clientProfile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, session.user.id),
    });

    let whereCondition;
    if (freelancerProfile) {
      whereCondition = eq(contracts.freelancerId, freelancerProfile.id);
    } else if (clientProfile) {
      whereCondition = eq(contracts.clientId, clientProfile.id);
    } else {
      return [];
    }

    const myContracts = await db.query.contracts.findMany({
      where: whereCondition,
      with: {
        job: true,
        client: {
          with: {
            user: true,
          },
        },
        freelancer: {
          with: {
            user: true,
          },
        },
      },
      orderBy: [desc(contracts.createdAt)],
    });

    return myContracts;
  } catch {
    return [];
  }
}

export async function getContractById(contractId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return null;
    }

    const contract = await db.query.contracts.findFirst({
      where: eq(contracts.id, contractId),
      with: {
        job: true,
        client: {
          with: {
            user: true,
          },
        },
        freelancer: {
          with: {
            user: true,
          },
        },
      },
    });

    if (!contract) {
      return null;
    }

    // Verify user is part of the contract
    const freelancerProfile = await db.query.freelancerProfiles.findFirst({
      where: eq(freelancerProfiles.userId, session.user.id),
    });

    const clientProfile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, session.user.id),
    });

    const isAuthorized =
      (freelancerProfile && contract.freelancerId === freelancerProfile.id) ||
      (clientProfile && contract.clientId === clientProfile.id);

    if (!isAuthorized) {
      return null;
    }

    return contract;
  } catch {
    return null;
  }
}

export async function completeContract(contractId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const clientProfile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, session.user.id),
    });

    if (!clientProfile) {
      return { success: false, error: 'Only clients can complete contracts' };
    }

    const contract = await db.query.contracts.findFirst({
      where: and(
        eq(contracts.id, contractId),
        eq(contracts.clientId, clientProfile.id)
      ),
    });

    if (!contract) {
      return { success: false, error: 'Contract not found or unauthorized' };
    }

    // Update contract status
    await db.update(contracts)
      .set({
        status: 'completed',
        endDate: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(contracts.id, contractId));

    // Update job status
    await db.update(jobs)
      .set({
        status: 'completed',
        updatedAt: new Date(),
      })
      .where(eq(jobs.id, contract.jobId));

    // Update freelancer stats
    await db.update(freelancerProfiles)
      .set({
        completedJobs: sql`${freelancerProfiles.completedJobs} + 1`,
        totalEarnings: sql`${freelancerProfiles.totalEarnings} + ${contract.amount}`,
      })
      .where(eq(freelancerProfiles.id, contract.freelancerId));

    // Update client stats
    await db.update(clientProfiles)
      .set({
        totalSpent: sql`${clientProfiles.totalSpent} + ${contract.amount}`,
      })
      .where(eq(clientProfiles.id, contract.clientId));

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to complete contract' };
  }
}
