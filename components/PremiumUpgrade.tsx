'use client';

import { useState } from 'react';
import { ArrowLeft, Crown, Check, Zap, TrendingUp, Shield, BarChart3 } from 'lucide-react';

interface PremiumUpgradeProps {
  onBack: () => void;
}

export function PremiumUpgrade({ onBack }: PremiumUpgradeProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Detailed spending insights and trends',
    },
    {
      icon: Shield,
      title: 'Enhanced Anomaly Detection',
      description: 'AI-powered fraud and unusual spending alerts',
    },
    {
      icon: BarChart3,
      title: 'Subscription Optimization',
      description: 'Smart recommendations to save money',
    },
    {
      icon: Zap,
      title: 'Priority Support',
      description: '24/7 premium customer support',
    },
  ];

  const plans = {
    monthly: {
      price: 5,
      period: 'month',
      savings: null,
    },
    yearly: {
      price: 50,
      period: 'year',
      savings: 17, // $60 - $50 = $10 saved, which is 17% off
    },
  };

  const handleUpgrade = async () => {
    setIsLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    // In a real app, this would integrate with payment processor
    alert('Premium upgrade successful! 🎉');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-400" />
            Premium Features
          </h1>
          <p className="text-white text-opacity-80 text-sm">
            Unlock advanced payment management
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="glass-card p-6 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600">
        <div className="text-center text-white">
          <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-2">Go Premium</h2>
          <p className="text-white text-opacity-90 mb-4">
            Take control of your finances with advanced features
          </p>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-sm text-white text-opacity-80 mb-2">
              Join 10,000+ users saving money with PayNoti Premium
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-bold">$</span>
              <span className="text-5xl font-bold">
                {plans[selectedPlan].price}
              </span>
              <span className="text-lg">/{plans[selectedPlan].period}</span>
            </div>
            {plans[selectedPlan].savings && (
              <p className="text-green-300 text-sm mt-2">
                Save {plans[selectedPlan].savings}% with yearly billing
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="space-y-4">
        <h3 className="text-white font-semibold">Choose Your Plan</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedPlan === 'monthly'
                ? 'border-blue-500 bg-blue-500 bg-opacity-20'
                : 'border-white border-opacity-20 bg-white bg-opacity-10'
            }`}
          >
            <div className="text-center">
              <p className="font-semibold text-white">Monthly</p>
              <p className="text-2xl font-bold text-white">$5</p>
              <p className="text-sm text-white text-opacity-70">per month</p>
            </div>
          </button>
          
          <button
            onClick={() => setSelectedPlan('yearly')}
            className={`p-4 rounded-xl border-2 transition-all relative ${
              selectedPlan === 'yearly'
                ? 'border-blue-500 bg-blue-500 bg-opacity-20'
                : 'border-white border-opacity-20 bg-white bg-opacity-10'
            }`}
          >
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Save 17%
            </div>
            <div className="text-center">
              <p className="font-semibold text-white">Yearly</p>
              <p className="text-2xl font-bold text-white">$50</p>
              <p className="text-sm text-white text-opacity-70">per year</p>
            </div>
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-white font-semibold">Premium Features</h3>
        
        <div className="space-y-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="glass-card p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* What's Included */}
      <div className="glass-card p-4 rounded-xl">
        <h4 className="font-semibold text-text-primary mb-3">
          What's Included
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-text-secondary">Unlimited payment tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-text-secondary">Advanced spending analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-text-secondary">Smart subscription optimization</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-text-secondary">Priority customer support</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-text-secondary">Export reports & data</span>
          </div>
        </div>
      </div>

      {/* Upgrade Button */}
      <button
        onClick={handleUpgrade}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Crown className="w-5 h-5" />
            Upgrade to Premium
          </>
        )}
      </button>

      {/* Money Back Guarantee */}
      <div className="text-center">
        <p className="text-sm text-white text-opacity-70">
          30-day money-back guarantee • Cancel anytime
        </p>
      </div>
    </div>
  );
}
