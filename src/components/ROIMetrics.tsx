'use client';

import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, Percent } from 'lucide-react';
import MetricCard from './MetricCard';
import type { ROIMetrics as ROIMetricsType } from '@/types/analytics';

export default function ROIMetrics() {
  const [metrics, setMetrics] = useState<ROIMetricsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/analytics/roi');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching ROI metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        ROI & Financial Metrics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={metrics.totalRevenue}
          format="currency"
          icon={<DollarSign className="w-6 h-6 text-blue-600" />}
        />
        <MetricCard
          title="Total Spent"
          value={metrics.totalSpent}
          format="currency"
          icon={<DollarSign className="w-6 h-6 text-red-600" />}
        />
        <MetricCard
          title="ROI"
          value={metrics.roi}
          format="percentage"
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
        />
        <MetricCard
          title="ROAS"
          value={metrics.roas}
          icon={<Percent className="w-6 h-6 text-purple-600" />}
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Performance Summary
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {metrics.period}
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Profit Margin
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {metrics.profitMargin.toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Net Profit
            </span>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              ${(metrics.totalRevenue - metrics.totalSpent).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
