import { NextResponse } from 'next/server';
import type { Campaign } from '@/types/analytics';

// Mock data generator
function generateCampaigns(): Campaign[] {
  const channels = ['Google Ads', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok'];
  const campaigns: Campaign[] = [];

  for (let i = 0; i < 12; i++) {
    const spent = Math.random() * 50000 + 10000;
    const impressions = Math.floor(Math.random() * 500000 + 100000);
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01));
    const conversions = Math.floor(clicks * (Math.random() * 0.1 + 0.02));
    const revenue = conversions * (Math.random() * 200 + 50);

    campaigns.push({
      id: `camp-${i + 1}`,
      name: `${channels[i % channels.length]} Campaign ${Math.floor(i / channels.length) + 1}`,
      status: i < 8 ? 'active' : i < 10 ? 'paused' : 'completed',
      startDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: i >= 10 ? new Date().toISOString() : undefined,
      budget: spent * 1.2,
      spent,
      impressions,
      clicks,
      conversions,
      revenue,
      channel: channels[i % channels.length],
    });
  }

  return campaigns;
}

export async function GET() {
  // Add small random variation to simulate real-time updates
  const campaigns = generateCampaigns();

  return NextResponse.json(campaigns);
}
