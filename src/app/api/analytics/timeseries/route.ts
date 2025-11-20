import { NextResponse } from 'next/server';
import type { TimeSeriesData } from '@/types/analytics';

export async function GET() {
  const days = 30;
  const data: TimeSeriesData[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const impressions = Math.floor(Math.random() * 50000 + 30000);
    const clicks = Math.floor(impressions * (Math.random() * 0.04 + 0.02));
    const conversions = Math.floor(clicks * (Math.random() * 0.08 + 0.03));
    const revenue = conversions * (Math.random() * 150 + 50);
    const ctr = (clicks / impressions) * 100;
    const cpc = revenue / clicks;

    data.push({
      date: date.toISOString().split('T')[0],
      impressions,
      clicks,
      conversions,
      revenue,
      ctr,
      cpc,
    });
  }

  return NextResponse.json(data);
}
