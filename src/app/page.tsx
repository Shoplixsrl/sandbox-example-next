import DashboardLayout from '@/components/DashboardLayout';
import ROIMetrics from '@/components/ROIMetrics';
import CampaignPerformance from '@/components/CampaignPerformance';
import ChannelAttribution from '@/components/ChannelAttribution';
import CACTracker from '@/components/CACTracker';
import EngagementRates from '@/components/EngagementRates';
import ABTestResults from '@/components/ABTestResults';
import TimeSeriesChart from '@/components/TimeSeriesChart';
import CustomReports from '@/components/CustomReports';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Marketing Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track campaign performance, ROI metrics, and customer acquisition in real-time
          </p>
        </div>

        {/* ROI Metrics Section */}
        <ROIMetrics />

        {/* Time Series Chart */}
        <TimeSeriesChart />

        {/* Campaign Performance */}
        <CampaignPerformance />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChannelAttribution />
          <EngagementRates />
        </div>

        {/* CAC Tracker */}
        <CACTracker />

        {/* A/B Test Results */}
        <ABTestResults />

        {/* Custom Reports */}
        <CustomReports />
      </div>
    </DashboardLayout>
  );
}
