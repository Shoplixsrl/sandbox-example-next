export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  channel: string;
}

export interface ROIMetrics {
  totalRevenue: number;
  totalSpent: number;
  roi: number;
  roas: number; // Return on Ad Spend
  profitMargin: number;
  period: string;
}

export interface ChannelAttribution {
  channel: string;
  conversions: number;
  revenue: number;
  percentage: number;
  touchPoints: number;
}

export interface CustomerAcquisitionCost {
  channel: string;
  totalSpent: number;
  customersAcquired: number;
  cac: number;
  ltv: number; // Lifetime Value
  ltvCacRatio: number;
}

export interface EngagementMetrics {
  metric: string;
  value: number;
  change: number;
  period: string;
}

export interface ABTest {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'draft';
  startDate: string;
  endDate?: string;
  variants: ABTestVariant[];
  metric: string;
  winner?: string;
}

export interface ABTestVariant {
  id: string;
  name: string;
  impressions: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  confidence: number;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DashboardFilters {
  dateRange: DateRange;
  channels?: string[];
  campaigns?: string[];
}

export interface TimeSeriesData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  cpc: number;
}

export interface ReportConfig {
  id: string;
  name: string;
  metrics: string[];
  filters: DashboardFilters;
  schedule?: 'daily' | 'weekly' | 'monthly';
}
