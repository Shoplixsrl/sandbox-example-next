'use client';

import { useState } from 'react';
import { Download, Calendar, Filter } from 'lucide-react';
import { format } from 'date-fns';

export default function CustomReports() {
  const [dateRange, setDateRange] = useState({
    from: format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    to: format(new Date(), 'yyyy-MM-dd'),
  });

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'revenue',
    'conversions',
    'roi',
  ]);

  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const availableMetrics = [
    { id: 'revenue', label: 'Revenue' },
    { id: 'conversions', label: 'Conversions' },
    { id: 'roi', label: 'ROI' },
    { id: 'impressions', label: 'Impressions' },
    { id: 'clicks', label: 'Clicks' },
    { id: 'ctr', label: 'CTR' },
    { id: 'cac', label: 'CAC' },
    { id: 'ltv', label: 'LTV' },
  ];

  const availableChannels = [
    'Google Ads',
    'Facebook',
    'Instagram',
    'LinkedIn',
    'Twitter',
    'Email',
  ];

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metricId)
        ? prev.filter((m) => m !== metricId)
        : [...prev, metricId]
    );
  };

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const handleExport = (format: 'csv' | 'pdf' | 'excel') => {
    // In a real implementation, this would call an API to generate the report
    console.log('Exporting report:', {
      format,
      dateRange,
      metrics: selectedMetrics,
      channels: selectedChannels,
    });
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Custom Reports
      </h2>

      <div className="space-y-6">
        {/* Date Range Selector */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="w-4 h-4" />
            Date Range
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                From
              </label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, from: e.target.value }))
                }
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                To
              </label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, to: e.target.value }))
                }
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Metrics Selector */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Filter className="w-4 h-4" />
            Select Metrics
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {availableMetrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => toggleMetric(metric.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetrics.includes(metric.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        {/* Channel Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Filter by Channel (optional)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableChannels.map((channel) => (
              <button
                key={channel}
                onClick={() => toggleChannel(channel)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedChannels.includes(channel)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {channel}
              </button>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
            Export Report
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Export as CSV
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Export as Excel
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Export as PDF
            </button>
          </div>
        </div>

        {/* Report Preview */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Report Preview
          </h3>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
              <p>
                <strong>Date Range:</strong> {dateRange.from} to {dateRange.to}
              </p>
              <p>
                <strong>Metrics:</strong>{' '}
                {selectedMetrics.length > 0
                  ? selectedMetrics.join(', ')
                  : 'None selected'}
              </p>
              <p>
                <strong>Channels:</strong>{' '}
                {selectedChannels.length > 0
                  ? selectedChannels.join(', ')
                  : 'All channels'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
