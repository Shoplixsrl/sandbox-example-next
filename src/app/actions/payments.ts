'use server';

import { db } from '@/db';
import { payments, contracts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const createPaymentSchema = z.object({
  contractId: z.string().uuid(),
  amount: z.string(),
});

export async function createPayment(data: z.infer<typeof createPaymentSchema>) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = createPaymentSchema.parse(data);

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

    // Verify user is the client
    if ((contract as any).client.user.id !== session.user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Create payment (mock - in production, integrate with real payment processor)
    const [payment] = await db.insert(payments).values({
      contractId: contract.id,
      amount: validated.amount,
      payerId: (contract as any).client.user.id,
      payeeId: (contract as any).freelancer.user.id,
      status: 'escrowed', // Mock escrow
      transactionId: `mock_${Date.now()}`,
    }).returning();

    return { success: true, paymentId: payment.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to create payment' };
  }
}

export async function releasePayment(paymentId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const payment = await db.query.payments.findFirst({
      where: eq(payments.id, paymentId),
    });

    if (!payment) {
      return { success: false, error: 'Payment not found' };
    }

    // Verify user is the payer
    if (payment.payerId !== session.user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Release payment (mock)
    await db.update(payments)
      .set({
        status: 'released',
        updatedAt: new Date(),
      })
      .where(eq(payments.id, paymentId));

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to release payment' };
  }
}
