'use client';

import { useMemo } from 'react';
import { Transaction } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsChartProps {
  transactions: Transaction[];
}

export function AnalyticsChart({ transactions }: AnalyticsChartProps) {
  const chartData = useMemo(() => {
    // Group transactions by month
    const monthlyData = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          amount: 0,
          count: 0,
        };
      }
      
      acc[monthKey].amount += transaction.amount;
      acc[monthKey].count += 1;
      
      return acc;
    }, {} as Record<string, { month: string; amount: number; count: number }>);

    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categories = transactions.reduce((acc, transaction) => {
      const category = transaction.type === 'subscription' ? 'Subscriptions' : 
                     transaction.type === 'payment' ? 'Payments' : 'Transfers';
      
      if (!acc[category]) {
        acc[category] = 0;
      }
      
      acc[category] += transaction.amount;
      
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / Object.values(categories).reduce((a, b) => a + b, 0)) * 100),
    }));
  }, [transactions]);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const avgMonthly = chartData.length > 0 ? totalSpent / chartData.length : 0;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">
            {formatCurrency(totalSpent)}
          </p>
          <p className="text-sm text-text-secondary">Total Spent</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">
            {formatCurrency(avgMonthly)}
          </p>
          <p className="text-sm text-text-secondary">Avg Monthly</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">
            {transactions.length}
          </p>
          <p className="text-sm text-text-secondary">Transactions</p>
        </div>
      </div>

      {/* Monthly Spending Chart */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Monthly Spending</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar 
                dataKey="amount" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Spending by Category</h4>
        <div className="flex items-center gap-6">
          <div className="h-32 w-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={60}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 space-y-2">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-text-secondary">{category.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">
                    {formatCurrency(category.value)}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {category.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">💡 Insights</h4>
        <div className="space-y-1 text-sm text-blue-700">
          <p>• Your highest spending month was {chartData.reduce((max, curr) => 
            curr.amount > max.amount ? curr : max, chartData[0] || { month: 'N/A', amount: 0 }
          ).month}</p>
          <p>• You have {transactions.filter(t => t.isRecurring).length} recurring payments</p>
          <p>• Average transaction amount: {formatCurrency(totalSpent / transactions.length || 0)}</p>
        </div>
      </div>
    </div>
  );
}
