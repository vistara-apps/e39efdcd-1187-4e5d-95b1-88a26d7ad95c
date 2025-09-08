'use client';

import { useState } from 'react';
import { Subscription } from '@/lib/types';
import { formatCurrency, formatDate, getDaysUntilDue, cn } from '@/lib/utils';
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Pause, 
  Play, 
  X, 
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

interface SubscriptionCardProps {
  subscription: Subscription;
  savingsOpportunity?: {
    monthlyCost: number;
    potentialSavings: number;
    savingsPercentage: number;
    recommendation: string;
  };
  showPremiumFeatures?: boolean;
}

export function SubscriptionCard({ 
  subscription, 
  savingsOpportunity,
  showPremiumFeatures = false 
}: SubscriptionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const daysUntilNext = getDaysUntilDue(subscription.nextBillingDate);
  const monthlyCost = subscription.billingCycle === 'yearly' 
    ? subscription.amount / 12 
    : subscription.amount;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'social':
        return '👥';
      case 'design':
        return '🎨';
      case 'productivity':
        return '⚡';
      case 'entertainment':
        return '🎬';
      default:
        return '📱';
    }
  };

  const handleToggleStatus = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {getCategoryIcon(subscription.category)}
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                {subscription.serviceName}
              </h3>
              <p className="text-sm text-text-secondary">
                {subscription.category} • {subscription.billingCycle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              getStatusColor(subscription.status)
            )}>
              {subscription.status}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(subscription.amount)}
              </p>
              <p className="text-xs text-text-secondary">
                {formatCurrency(monthlyCost)}/month
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-text-secondary">Next billing</p>
              <p className="font-medium text-text-primary">
                {daysUntilNext > 0 ? `${daysUntilNext} days` : 'Today'}
              </p>
            </div>
          </div>
        </div>

        {/* Savings Opportunity */}
        {showPremiumFeatures && savingsOpportunity && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg mb-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Save {formatCurrency(savingsOpportunity.potentialSavings)}/month
              </span>
            </div>
            <p className="text-xs text-green-700">
              {savingsOpportunity.recommendation}
            </p>
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-gray-200 pt-3 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary">Started</p>
                <p className="font-medium text-text-primary">
                  {formatDate(subscription.nextBillingDate)}
                </p>
              </div>
              <div>
                <p className="text-text-secondary">Annual Cost</p>
                <p className="font-medium text-text-primary">
                  {formatCurrency(monthlyCost * 12)}
                </p>
              </div>
            </div>

            {/* Premium Analytics */}
            {showPremiumFeatures && (
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-purple-800 mb-2">
                  💎 Usage Analytics
                </h4>
                <div className="space-y-1 text-xs text-purple-700">
                  <p>• Last used: 2 days ago</p>
                  <p>• Usage frequency: 4x/week</p>
                  <p>• Feature utilization: 65%</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleToggleStatus}
                disabled={isLoading}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  subscription.status === 'active'
                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    : 'bg-green-100 text-green-800 hover:bg-green-200',
                  isLoading && 'opacity-50 cursor-not-allowed'
                )}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : subscription.status === 'active' ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Resume
                  </>
                )}
              </button>
              
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-800 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors">
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
