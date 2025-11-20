import { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
  format?: 'number' | 'currency' | 'percentage';
}

export default function MetricCard({
  title,
  value,
  change,
  icon,
  format = 'number',
}: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;

    switch (format) {
      case 'currency':
        return `$${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
      case 'percentage':
        return `${val.toFixed(2)}%`;
      default:
        return val.toLocaleString(undefined, { maximumFractionDigits: 2 });
    }
  };

  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatValue(value)}
          </p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {isPositive && (
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              )}
              {isNegative && (
                <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositive
                    ? 'text-green-500'
                    : isNegative
                    ? 'text-red-500'
                    : 'text-gray-500'
                }`}
              >
                {change > 0 ? '+' : ''}
                {change.toFixed(2)}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                vs last period
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
