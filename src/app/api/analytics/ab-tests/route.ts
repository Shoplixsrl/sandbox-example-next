import { NextResponse } from 'next/server';
import type { ABTest } from '@/types/analytics';

export async function GET() {
  const tests: ABTest[] = [
    {
      id: 'test-1',
      name: 'Homepage CTA Button Color',
      status: 'running',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      metric: 'Conversion Rate',
      variants: [
        {
          id: 'var-1a',
          name: 'Control (Blue)',
          impressions: 45230,
          conversions: 1809,
          conversionRate: 4.0,
          revenue: 90450,
          confidence: 0,
        },
        {
          id: 'var-1b',
          name: 'Variant A (Green)',
          impressions: 44890,
          conversions: 2019,
          conversionRate: 4.5,
          revenue: 100950,
          confidence: 87,
        },
      ],
    },
    {
      id: 'test-2',
      name: 'Email Subject Line Test',
      status: 'running',
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      metric: 'Open Rate',
      variants: [
        {
          id: 'var-2a',
          name: 'Control',
          impressions: 10000,
          conversions: 2350,
          conversionRate: 23.5,
          revenue: 0,
          confidence: 0,
        },
        {
          id: 'var-2b',
          name: 'Personalized',
          impressions: 10000,
          conversions: 2890,
          conversionRate: 28.9,
          revenue: 0,
          confidence: 95,
        },
      ],
      winner: 'var-2b',
    },
    {
      id: 'test-3',
      name: 'Product Page Layout',
      status: 'completed',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      metric: 'Add to Cart Rate',
      variants: [
        {
          id: 'var-3a',
          name: 'Current Layout',
          impressions: 89450,
          conversions: 12523,
          conversionRate: 14.0,
          revenue: 312575,
          confidence: 0,
        },
        {
          id: 'var-3b',
          name: 'New Layout',
          impressions: 88920,
          conversions: 14249,
          conversionRate: 16.0,
          revenue: 356225,
          confidence: 99,
        },
      ],
      winner: 'var-3b',
    },
  ];

  return NextResponse.json(tests);
}
