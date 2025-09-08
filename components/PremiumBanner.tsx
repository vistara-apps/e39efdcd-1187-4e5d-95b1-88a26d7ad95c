'use client';

import { Crown, ArrowRight } from 'lucide-react';

interface PremiumBannerProps {
  onUpgrade?: () => void;
}

export function PremiumBanner({ onUpgrade }: PremiumBannerProps) {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl text-white mb-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">
              Upgrade to Premium
            </h3>
            <p className="text-white text-opacity-90 text-xs">
              Advanced analytics & optimization
            </p>
          </div>
        </div>
        
        <button
          onClick={onUpgrade}
          className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200"
        >
          <span className="text-sm font-medium">$5/mo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
