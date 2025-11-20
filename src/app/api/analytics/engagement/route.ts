import { NextResponse } from 'next/server';
import type { EngagementMetrics } from '@/types/analytics';

export async function GET() {
  const metrics: EngagementMetrics[] = [
    {
      metric: 'Email Open Rate',
      value: Math.random() * 30 + 20,
      change: (Math.random() - 0.5) * 10,
      period: 'vs last period',
    },
    {
      metric: 'Click-Through Rate',
      value: Math.random() * 5 + 2,
      change: (Math.random() - 0.5) * 3,
      period: 'vs last period',
    },
    {
      metric: 'Social Engagement',
      value: Math.random() * 10 + 5,
      change: (Math.random() - 0.5) * 5,
      period: 'vs last period',
    },
    {
      metric: 'Bounce Rate',
      value: Math.random() * 30 + 40,
      change: (Math.random() - 0.5) * 8,
      period: 'vs last period',
    },
    {
      metric: 'Time on Site',
      value: Math.random() * 200 + 120,
      change: (Math.random() - 0.5) * 30,
      period: 'vs last period',
    },
    {
      metric: 'Pages per Session',
      value: Math.random() * 3 + 2,
      change: (Math.random() - 0.5) * 1,
      period: 'vs last period',
    },
  ];

  return NextResponse.json(metrics);
}
