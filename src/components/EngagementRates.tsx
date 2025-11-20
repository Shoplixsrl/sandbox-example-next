'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import type { EngagementMetrics } from '@/types/analytics';

export default function EngagementRates() {
  const [metrics, setMetrics] = useState<EngagementMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEngagementMetrics();
  }, []);

  const fetchEngagementMetrics = async () => {
    try {
      const response = await fetch('/api/analytics/engagement');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching engagement metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Engagement Metrics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const isPositive = metric.change > 0;
          const isNegative = metric.change < 0;
          const isBounceRate = metric.metric.includes('Bounce');

          return (
            <div
              key={metric.metric}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.metric}
                </h3>
                <div className="flex items-center">
                  {isPositive && !isBounceRate && (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  )}
                  {isNegative && !isBounceRate && (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  {isPositive && isBounceRate && (
                    <ArrowUp className="w-4 h-4 text-red-500" />
                  )}
                  {isNegative && isBounceRate && (
                    <ArrowDown className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>
              <div className="mb-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.metric.includes('Time')
                    ? `${Math.floor(metric.value / 60)}m ${Math.floor(metric.value % 60)}s`
                    : metric.value.toFixed(2) + (metric.metric.includes('Rate') ? '%' : '')}
                </p>
              </div>
              <div className="flex items-center text-sm">
                <span
                  className={`font-medium ${
                    (isPositive && !isBounceRate) || (isNegative && isBounceRate)
                      ? 'text-green-600 dark:text-green-400'
                      : (isNegative && !isBounceRate) || (isPositive && isBounceRate)
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-500'
                  }`}
                >
                  {metric.change > 0 ? '+' : ''}
                  {metric.change.toFixed(2)}%
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  {metric.period}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
