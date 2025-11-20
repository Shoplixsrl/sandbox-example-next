'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CustomerAcquisitionCost } from '@/types/analytics';

export default function CACTracker() {
  const [cacData, setCacData] = useState<CustomerAcquisitionCost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCACData();
  }, []);

  const fetchCACData = async () => {
    try {
      const response = await fetch('/api/analytics/cac');
      const data = await response.json();
      setCacData(data);
    } catch (error) {
      console.error('Error fetching CAC data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Customer Acquisition Cost (CAC)
      </h2>
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cacData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="channel" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend />
            <Bar dataKey="cac" fill="#3B82F6" name="CAC ($)" />
            <Bar dataKey="ltv" fill="#10B981" name="LTV ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Channel
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Customers
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Total Spent
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                CAC
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                LTV
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                LTV:CAC Ratio
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {cacData.map((item) => (
              <tr key={item.channel} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {item.channel}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">
                  {item.customersAcquired.toLocaleString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">
                  ${item.totalSpent.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                  ${item.cac.toFixed(2)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                  ${item.ltv.toFixed(2)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                  <span
                    className={`font-medium ${
                      item.ltvCacRatio >= 3
                        ? 'text-green-600 dark:text-green-400'
                        : item.ltvCacRatio >= 1
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {item.ltvCacRatio.toFixed(2)}:1
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> A healthy LTV:CAC ratio is typically 3:1 or higher. This means
          the lifetime value of a customer should be at least 3 times their acquisition cost.
        </p>
      </div>
    </div>
  );
}
