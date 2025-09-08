'use client';

import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PaymentSummaryCardProps {
  title: string;
  amount: number;
  currency?: string;
  trend?: 'up' | 'down';
  trendValue?: number;
  subtitle?: string;
}

export function PaymentSummaryCard({ 
  title, 
  amount, 
  currency = 'USD', 
  trend, 
  trendValue,
  subtitle 
}: PaymentSummaryCardProps) {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-text-secondary text-sm font-medium">
          {title}
        </h3>
        {trend && trendValue && (
          <div className={`flex items-center gap-1 ${
            trend === 'up' ? 'text-red-500' : 'text-green-500'
          }`}>
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {trendValue}%
            </span>
          </div>
        )}
      </div>
      
      <div className="mb-1">
        <span className="text-2xl font-bold text-text-primary">
          {formatCurrency(amount, currency)}
        </span>
      </div>
      
      {subtitle && (
        <p className="text-text-secondary text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}
