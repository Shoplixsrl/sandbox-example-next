'use client';

import { useEffect, useState } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import type { ABTest } from '@/types/analytics';

export default function ABTestResults() {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchABTests();
  }, []);

  const fetchABTests = async () => {
    try {
      const response = await fetch('/api/analytics/ab-tests');
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error('Error fetching A/B tests:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        A/B Test Results
      </h2>
      <div className="space-y-6">
        {tests.map((test) => (
          <div
            key={test.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {test.name}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <span>Metric: {test.metric}</span>
                  <span>•</span>
                  <span>
                    Started: {new Date(test.startDate).toLocaleDateString()}
                  </span>
                  {test.endDate && (
                    <>
                      <span>•</span>
                      <span>
                        Ended: {new Date(test.endDate).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  test.status === 'running'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : test.status === 'completed'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {test.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {test.variants.map((variant) => {
                const isWinner = variant.id === test.winner;
                const isControl = variant.name.toLowerCase().includes('control');

                return (
                  <div
                    key={variant.id}
                    className={`p-4 rounded-lg border-2 ${
                      isWinner
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {variant.name}
                      </h4>
                      {isWinner && (
                        <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          Impressions
                        </span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {variant.impressions.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          Conversions
                        </span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {variant.conversions.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          Conv. Rate
                        </span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {variant.conversionRate.toFixed(2)}%
                        </p>
                      </div>
                      {!isControl && variant.confidence > 0 && (
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">
                            Confidence
                          </span>
                          <p
                            className={`font-medium ${
                              variant.confidence >= 95
                                ? 'text-green-600 dark:text-green-400'
                                : variant.confidence >= 80
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {variant.confidence}%
                          </p>
                        </div>
                      )}
                    </div>
                    {variant.revenue > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Revenue
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ${variant.revenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {test.winner && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-900 dark:text-green-200">
                    Winner Identified
                  </p>
                  <p className="text-green-700 dark:text-green-300">
                    {
                      test.variants.find((v) => v.id === test.winner)?.name
                    }{' '}
                    has shown statistically significant improvement.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
