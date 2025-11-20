import { NextResponse } from 'next/server';
import type { ROIMetrics } from '@/types/analytics';

export async function GET() {
  const totalRevenue = Math.random() * 500000 + 300000;
  const totalSpent = Math.random() * 200000 + 100000;
  const roi = ((totalRevenue - totalSpent) / totalSpent) * 100;
  const roas = totalRevenue / totalSpent;
  const profitMargin = ((totalRevenue - totalSpent) / totalRevenue) * 100;

  const metrics: ROIMetrics = {
    totalRevenue,
    totalSpent,
    roi,
    roas,
    profitMargin,
    period: 'Last 30 days',
  };

  return NextResponse.json(metrics);
}
