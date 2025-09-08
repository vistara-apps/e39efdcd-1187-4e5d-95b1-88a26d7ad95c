// User entity
export interface User {
  userId: string;
  walletAddress: string;
  notificationPreferences: NotificationPreferences;
  premiumStatus: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  reminderDays: number;
}

// PaymentAccount entity
export interface PaymentAccount {
  accountId: string;
  userId: string;
  accountType: 'wallet' | 'bank' | 'credit_card';
  accountIdentifier: string;
  displayName: string;
}

// Transaction entity
export interface Transaction {
  transactionId: string;
  accountId: string;
  userId: string;
  description: string;
  amount: number;
  currency: string;
  type: 'payment' | 'subscription' | 'transfer';
  date: string;
  status: 'pending' | 'completed' | 'failed';
  isRecurring: boolean;
  dueDate?: string;
}

// Subscription entity
export interface Subscription {
  subscriptionId: string;
  userId: string;
  serviceName: string;
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  nextBillingDate: string;
  amount: number;
  currency: string;
  status: 'active' | 'paused' | 'cancelled';
  category: string;
}

// Payment summary for dashboard
export interface PaymentSummary {
  totalDue: number;
  upcomingPayments: Transaction[];
  recentTransactions: Transaction[];
  subscriptions: Subscription[];
}

// Notification types
export interface PaymentNotification {
  id: string;
  type: 'reminder' | 'overdue' | 'anomaly';
  title: string;
  message: string;
  amount?: number;
  dueDate?: string;
  isRead: boolean;
  createdAt: string;
}
