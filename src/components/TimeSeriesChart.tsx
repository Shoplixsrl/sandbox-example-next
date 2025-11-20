'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TimeSeriesData } from '@/types/analytics';

export default function TimeSeriesChart() {
  const [data, setData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'conversions' | 'impressions'>(
    'revenue'
  );

  useEffect(() => {
    fetchTimeSeriesData();
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchTimeSeriesData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTimeSeriesData = async () => {
    try {
      const response = await fetch('/api/analytics/timeseries');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching time series data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Performance Over Time
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedMetric('revenue')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedMetric === 'revenue'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setSelectedMetric('conversions')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedMetric === 'conversions'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Conversions
          </button>
          <button
            onClick={() => setSelectedMetric('impressions')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedMetric === 'impressions'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Impressions
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value: number) => {
              if (selectedMetric === 'revenue') {
                return `$${value.toLocaleString()}`;
              }
              return value.toLocaleString();
            }}
          />
          <Area
            type="monotone"
            dataKey={selectedMetric}
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorMetric)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
