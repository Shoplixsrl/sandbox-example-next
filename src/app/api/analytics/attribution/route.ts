import { NextResponse } from 'next/server';
import type { ChannelAttribution } from '@/types/analytics';

export async function GET() {
  const channels = ['Google Ads', 'Facebook', 'Instagram', 'LinkedIn', 'Email', 'Organic'];
  const totalConversions = Math.floor(Math.random() * 10000 + 5000);

  let remainingPercentage = 100;
  const attributions: ChannelAttribution[] = channels.map((channel, index) => {
    const isLast = index === channels.length - 1;
    const percentage = isLast
      ? remainingPercentage
      : Math.floor(Math.random() * (remainingPercentage / (channels.length - index)));

    remainingPercentage -= percentage;

    const conversions = Math.floor((totalConversions * percentage) / 100);
    const revenue = conversions * (Math.random() * 150 + 50);

    return {
      channel,
      conversions,
      revenue,
      percentage,
      touchPoints: Math.floor(conversions * (Math.random() * 3 + 1)),
    };
  });

  return NextResponse.json(attributions);
}
