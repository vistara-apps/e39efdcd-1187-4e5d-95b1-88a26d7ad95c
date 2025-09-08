'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { PaymentCard } from '@/components/PaymentCard';
import { AnalyticsChart } from '@/components/AnalyticsChart';
import { PremiumBanner } from '@/components/PremiumBanner';
import { mockTransactions } from '@/lib/mock-data';
import { detectAnomalies, formatCurrency } from '@/lib/utils';
import { Transaction } from '@/lib/types';
import { 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  Filter,
  BarChart3,
  DollarSign,
  Clock
} from 'lucide-react';

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockTransactions);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'pending' | 'overdue'>('all');
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    let filtered = transactions;
    
    switch (selectedFilter) {
      case 'completed':
        filtered = transactions.filter(t => t.status === 'completed');
        break;
      case 'pending':
        filtered = transactions.filter(t => t.status === 'pending');
        break;
      case 'overdue':
        // Simple overdue logic - due date is in the past
        filtered = transactions.filter(t => 
          t.dueDate && new Date(t.dueDate) < new Date() && t.status === 'pending'
        );
        break;
      default:
        filtered = transactions;
    }
    
    setFilteredTransactions(filtered);
  }, [transactions, selectedFilter]);

  const totalSpent = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const anomalies = detectAnomalies(transactions);

  const handleToggleCardDetails = (transactionId: string) => {
    setExpandedCard(prev => prev === transactionId ? null : transactionId);
  };

  const filterOptions = [
    { id: 'all', label: 'All', count: transactions.length },
    { id: 'completed', label: 'Completed', count: transactions.filter(t => t.status === 'completed').length },
    { id: 'pending', label: 'Pending', count: transactions.filter(t => t.status === 'pending').length },
    { id: 'overdue', label: 'Overdue', count: transactions.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status === 'pending').length },
  ];

  return (
    <AppShell activeTab="history">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Payment History
          </h1>
          <p className="text-white text-opacity-80 text-sm">
            Track your payment activity and insights
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-card p-3 rounded-xl text-center">
            <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-text-secondary">Total Spent</p>
            <p className="text-lg font-bold text-text-primary">
              {formatCurrency(totalSpent)}
            </p>
          </div>
          
          <div className="glass-card p-3 rounded-xl text-center">
            <Clock className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-text-secondary">Pending</p>
            <p className="text-lg font-bold text-text-primary">
              {formatCurrency(pendingAmount)}
            </p>
          </div>
          
          <div className="glass-card p-3 rounded-xl text-center">
            <BarChart3 className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-text-secondary">Transactions</p>
            <p className="text-lg font-bold text-text-primary">
              {transactions.length}
            </p>
          </div>
        </div>

        {/* Premium Analytics */}
        {showPremiumFeatures ? (
          <div className="glass-card p-4 rounded-xl">
            <h3 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              💎 Spending Analytics
            </h3>
            <AnalyticsChart transactions={transactions} />
          </div>
        ) : (
          <PremiumBanner 
            onUpgrade={() => setShowPremiumFeatures(true)}
            message="Unlock detailed spending analytics and trends"
          />
        )}

        {/* Anomaly Detection */}
        {showPremiumFeatures && anomalies.length > 0 && (
          <div className="glass-card p-4 rounded-xl">
            <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Spending Anomalies Detected
            </h3>
            <div className="space-y-2">
              {anomalies.map(anomaly => (
                <div key={anomaly.transactionId} className="bg-orange-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-orange-800">
                        {anomaly.description}
                      </p>
                      <p className="text-sm text-orange-600">
                        {anomaly.anomalyReason}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-orange-800">
                      {formatCurrency(anomaly.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedFilter(option.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFilter === option.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <span>{option.label}</span>
              <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {option.count}
              </span>
            </button>
          ))}
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {selectedFilter === 'all' ? 'All Transactions' : 
               selectedFilter === 'completed' ? 'Completed Payments' :
               selectedFilter === 'pending' ? 'Pending Payments' : 'Overdue Payments'}
            </h2>
            <button className="text-text-secondary hover:text-text-primary">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          
          {filteredTransactions.length === 0 ? (
            <div className="glass-card p-8 rounded-xl text-center">
              <Calendar className="w-12 h-12 text-text-secondary mx-auto mb-4" />
              <h3 className="text-text-primary font-medium mb-2">
                No transactions found
              </h3>
              <p className="text-text-secondary text-sm">
                {selectedFilter === 'all' 
                  ? 'Start by adding your first payment'
                  : `No ${selectedFilter} transactions to show`
                }
              </p>
            </div>
          ) : (
            filteredTransactions.map(transaction => (
              <PaymentCard
                key={transaction.transactionId}
                transaction={transaction}
                showDetails={expandedCard === transaction.transactionId}
                onToggleDetails={() => handleToggleCardDetails(transaction.transactionId)}
              />
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="primary-button text-center">
            Add Payment
          </button>
          <button className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-30 transition-all duration-200">
            Export Data
          </button>
        </div>
      </div>
    </AppShell>
  );
}
