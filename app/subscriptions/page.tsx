'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { PremiumBanner } from '@/components/PremiumBanner';
import { mockSubscriptions } from '@/lib/mock-data';
import { calculateSavingsOpportunities } from '@/lib/utils';
import { Subscription } from '@/lib/types';
import { TrendingUp, DollarSign, Calendar, AlertTriangle } from 'lucide-react';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [savingsOpportunities, setSavingsOpportunities] = useState<any[]>([]);
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false);

  useEffect(() => {
    const opportunities = calculateSavingsOpportunities(subscriptions);
    setSavingsOpportunities(opportunities);
  }, [subscriptions]);

  const totalMonthlySpend = subscriptions.reduce((total, sub) => {
    const monthlyCost = sub.billingCycle === 'yearly' ? sub.amount / 12 : sub.amount;
    return total + monthlyCost;
  }, 0);

  const totalPotentialSavings = savingsOpportunities.reduce((total, opp) => 
    total + opp.potentialSavings, 0
  );

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  const pausedSubscriptions = subscriptions.filter(sub => sub.status === 'paused');

  return (
    <AppShell activeTab="wallet">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Subscription Management
          </h1>
          <p className="text-white text-opacity-80 text-sm">
            Track and optimize your recurring payments
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-blue-400" />
              <span className="text-text-secondary text-sm">Monthly Spend</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">
              ${totalMonthlySpend.toFixed(2)}
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-text-secondary text-sm">Potential Savings</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              ${totalPotentialSavings.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Premium Banner */}
        {!showPremiumFeatures && (
          <PremiumBanner 
            onUpgrade={() => setShowPremiumFeatures(true)}
            message="Unlock advanced subscription analytics and optimization tools"
          />
        )}

        {/* Active Subscriptions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Active Subscriptions ({activeSubscriptions.length})
            </h2>
          </div>
          
          {activeSubscriptions.map(subscription => (
            <SubscriptionCard
              key={subscription.subscriptionId}
              subscription={subscription}
              savingsOpportunity={savingsOpportunities.find(
                opp => opp.subscriptionId === subscription.subscriptionId
              )}
              showPremiumFeatures={showPremiumFeatures}
            />
          ))}
        </div>

        {/* Paused Subscriptions */}
        {pausedSubscriptions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Paused Subscriptions ({pausedSubscriptions.length})
            </h2>
            
            {pausedSubscriptions.map(subscription => (
              <SubscriptionCard
                key={subscription.subscriptionId}
                subscription={subscription}
                showPremiumFeatures={showPremiumFeatures}
              />
            ))}
          </div>
        )}

        {/* Premium Features */}
        {showPremiumFeatures && (
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-text-primary font-semibold mb-4">
              💎 Premium Analytics
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">
                  Optimization Recommendations
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Switch Figma to annual billing: Save $22.50/year</li>
                  <li>• Bundle Farcaster with other social tools: Save $60/year</li>
                  <li>• Consider alternatives for underused services</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">
                  Usage Insights
                </h4>
                <p className="text-sm text-yellow-700">
                  Based on your activity, you're only using 60% of your Figma Pro features. 
                  Consider downgrading to save $9/month.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="primary-button text-center">
            Add Subscription
          </button>
          <button className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-30 transition-all duration-200">
            Export Report
          </button>
        </div>
      </div>
    </AppShell>
  );
}
