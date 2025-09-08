'use client';

import { useEffect, useState } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { AppShell } from '@/components/AppShell';
import { PaymentCard } from '@/components/PaymentCard';
import { PaymentSummaryCard } from '@/components/PaymentSummaryCard';
import { NotificationBubble } from '@/components/NotificationBubble';
import { PremiumBanner } from '@/components/PremiumBanner';
import { mockPaymentSummary, mockNotifications } from '@/lib/mock-data';
import { PaymentNotification } from '@/lib/types';
import { Bell, Plus } from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [notifications, setNotifications] = useState<PaymentNotification[]>(mockNotifications);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(true);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleToggleCardDetails = (transactionId: string) => {
    setExpandedCard(prev => prev === transactionId ? null : transactionId);
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);

  return (
    <AppShell activeTab="home">
      <div className="space-y-6">
        {/* Header with title and wallet */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            PayNoti & 5r our
          </h1>
          <p className="text-white text-opacity-80 text-sm mb-4">
            Smart notification
          </p>
          
          <Wallet>
            <ConnectWallet className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white border-opacity-30">
              <Name className="text-white" />
            </ConnectWallet>
          </Wallet>
        </div>

        {/* Featured Payment Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white text-opacity-80 text-sm">Farcaster Degen Ethereum</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$19,999</span>
                <span className="text-white text-opacity-80 text-sm">(7am)</span>
              </div>
            </div>
            <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium">
              Past result
            </div>
          </div>
        </div>

        {/* Notifications */}
        {showNotifications && unreadNotifications.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications ({unreadNotifications.length})
              </h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-white text-opacity-70 hover:text-opacity-100 text-sm"
              >
                Hide
              </button>
            </div>
            {unreadNotifications.map(notification => (
              <NotificationBubble
                key={notification.id}
                notification={notification}
                onDismiss={handleDismissNotification}
              />
            ))}
          </div>
        )}

        {/* Premium Banner */}
        <PremiumBanner onUpgrade={() => console.log('Upgrade to premium')} />

        {/* Payment Summary Cards */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-text-primary font-semibold">Payment Due dates</h2>
            <button className="text-text-secondary hover:text-text-primary">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Usdy 1539.29745</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-text-primary">$2.45</span>
              <span className="text-2xl font-bold text-text-primary">$773</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary text-sm">Figament due</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary text-sm">$19,074 2016</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-text-primary">$18.75</span>
                <span className="text-2xl font-bold text-text-primary">$467</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary text-sm">Selling</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary text-sm">Carday Dstates</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-text-primary">$1.50</span>
                <span className="text-2xl font-bold text-text-primary">$13.35</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-4">
          <h2 className="text-white font-semibold">Recent Activity</h2>
          {mockPaymentSummary.upcomingPayments.map(transaction => (
            <PaymentCard
              key={transaction.transactionId}
              transaction={transaction}
              showDetails={expandedCard === transaction.transactionId}
              onToggleDetails={() => handleToggleCardDetails(transaction.transactionId)}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="primary-button text-center">
            Add Payment
          </button>
          <button className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-30 transition-all duration-200">
            View All
          </button>
        </div>
      </div>
    </AppShell>
  );
}
