import { NextResponse } from 'next/server';
import type { CustomerAcquisitionCost } from '@/types/analytics';

export async function GET() {
  const channels = ['Google Ads', 'Facebook', 'Instagram', 'LinkedIn', 'Email'];

  const cacData: CustomerAcquisitionCost[] = channels.map(channel => {
    const totalSpent = Math.random() * 50000 + 10000;
    const customersAcquired = Math.floor(Math.random() * 500 + 100);
    const cac = totalSpent / customersAcquired;
    const ltv = Math.random() * 1000 + 300;
    const ltvCacRatio = ltv / cac;

    return {
      channel,
      totalSpent,
      customersAcquired,
      cac,
      ltv,
      ltvCacRatio,
    };
  });

  return NextResponse.json(cacData);
}
