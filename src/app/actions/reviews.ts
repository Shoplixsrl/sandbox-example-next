'use server';

import { db } from '@/db';
import { reviews, contracts, freelancerProfiles, clientProfiles } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const createReviewSchema = z.object({
  contractId: z.string().uuid(),
  revieweeId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters').optional(),
});

export async function createReview(data: z.infer<typeof createReviewSchema>) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = createReviewSchema.parse(data);

    // Get contract
    const contract = await db.query.contracts.findFirst({
      where: eq(contracts.id, validated.contractId),
      with: {
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
      return { success: false, error: 'Contract not found' };
    }

    // Verify contract is completed
    if (contract.status !== 'completed') {
      return { success: false, error: 'Can only review completed contracts' };
    }

    // Verify user is part of contract
    const isClient = (contract as any).client.user.id === session.user.id;
    const isFreelancer = (contract as any).freelancer.user.id === session.user.id;

    if (!isClient && !isFreelancer) {
      return { success: false, error: 'Unauthorized' };
    }

    // Verify reviewee
    if (
      (isClient && validated.revieweeId !== (contract as any).freelancer.user.id) ||
      (isFreelancer && validated.revieweeId !== (contract as any).client.user.id)
    ) {
      return { success: false, error: 'Invalid reviewee' };
    }

    // Check if already reviewed
    const existingReview = await db.query.reviews.findFirst({
      where: and(
        eq(reviews.contractId, validated.contractId),
        eq(reviews.reviewerId, session.user.id)
      ),
    });

    if (existingReview) {
      return { success: false, error: 'You have already reviewed this contract' };
    }

    // Create review
    await db.insert(reviews).values({
      contractId: validated.contractId,
      reviewerId: session.user.id,
      revieweeId: validated.revieweeId,
      rating: validated.rating,
      comment: validated.comment,
    });

    // Update reviewee's rating
    const freelancerProfile = await db.query.freelancerProfiles.findFirst({
      where: eq(freelancerProfiles.userId, validated.revieweeId),
    });

    const clientProfile = await db.query.clientProfiles.findFirst({
      where: eq(clientProfiles.userId, validated.revieweeId),
    });

    if (freelancerProfile) {
      const allReviews = await db.query.reviews.findMany({
        where: eq(reviews.revieweeId, validated.revieweeId),
      });

      const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

      await db.update(freelancerProfiles)
        .set({
          rating: avgRating.toFixed(2),
          reviewCount: allReviews.length,
        })
        .where(eq(freelancerProfiles.id, freelancerProfile.id));
    } else if (clientProfile) {
      const allReviews = await db.query.reviews.findMany({
        where: eq(reviews.revieweeId, validated.revieweeId),
      });

      const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

      await db.update(clientProfiles)
        .set({
          rating: avgRating.toFixed(2),
          reviewCount: allReviews.length,
        })
        .where(eq(clientProfiles.id, clientProfile.id));
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to create review' };
  }
}

export async function getReviewsForUser(userId: string) {
  try {
    const userReviews = await db.query.reviews.findMany({
      where: eq(reviews.revieweeId, userId),
      with: {
        reviewer: true,
      },
    });

    return userReviews;
  } catch {
    return [];
  }
}
