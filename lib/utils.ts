import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, isAfter, isBefore, addDays } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: string): string {
  return format(new Date(date), 'MMM dd, yyyy');
}

export function formatRelativeDate(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function getDaysUntilDue(dueDate: string): number {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getPaymentStatus(dueDate: string): 'upcoming' | 'due' | 'overdue' {
  const daysUntil = getDaysUntilDue(dueDate);
  
  if (daysUntil < 0) return 'overdue';
  if (daysUntil <= 3) return 'due';
  return 'upcoming';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'overdue':
      return 'text-red-600 bg-red-50';
    case 'due':
      return 'text-yellow-600 bg-yellow-50';
    case 'upcoming':
      return 'text-blue-600 bg-blue-50';
    case 'completed':
      return 'text-green-600 bg-green-50';
    case 'pending':
      return 'text-orange-600 bg-orange-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function detectAnomalies(transactions: any[]): any[] {
  // Simple anomaly detection logic
  const anomalies = [];
  const amounts = transactions.map(t => t.amount);
  const avgAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length;
  const threshold = avgAmount * 2; // 2x average is considered anomalous

  for (const transaction of transactions) {
    if (transaction.amount > threshold) {
      anomalies.push({
        ...transaction,
        anomalyType: 'high-amount',
        anomalyReason: `Amount is ${Math.round(transaction.amount / avgAmount)}x higher than average`,
      });
    }
  }

  return anomalies;
}

export function calculateSavingsOpportunities(subscriptions: any[]): any[] {
  // Simple savings calculation
  return subscriptions.map(sub => {
    const monthlyCost = sub.billingCycle === 'yearly' ? sub.amount / 12 : sub.amount;
    const potentialSavings = monthlyCost * 0.1; // Assume 10% potential savings
    
    return {
      ...sub,
      monthlyCost,
      potentialSavings,
      savingsPercentage: 10,
      recommendation: 'Consider switching to annual billing for additional savings',
    };
  });
}
