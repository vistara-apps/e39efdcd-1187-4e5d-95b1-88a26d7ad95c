'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { NotificationSettings } from '@/components/NotificationSettings';
import { PremiumUpgrade } from '@/components/PremiumUpgrade';
import { 
  Bell, 
  Shield, 
  Wallet, 
  Crown, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  User,
  Settings as SettingsIcon
} from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  const settingsSections = [
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage payment reminders and alerts',
      icon: Bell,
      component: NotificationSettings,
    },
    {
      id: 'premium',
      title: 'Premium Features',
      description: 'Upgrade for advanced analytics',
      icon: Crown,
      component: PremiumUpgrade,
    },
    {
      id: 'wallet',
      title: 'Wallet Settings',
      description: 'Manage connected accounts',
      icon: Wallet,
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Data and security preferences',
      icon: Shield,
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: HelpCircle,
    },
  ];

  const renderActiveSection = () => {
    const section = settingsSections.find(s => s.id === activeSection);
    if (!section?.component) return null;
    
    const Component = section.component;
    return <Component onBack={() => setActiveSection(null)} />;
  };

  if (activeSection) {
    return (
      <AppShell activeTab="profile">
        {renderActiveSection()}
      </AppShell>
    );
  }

  return (
    <AppShell activeTab="profile">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Settings
          </h1>
          <p className="text-white text-opacity-80 text-sm">
            Manage your PayNoti preferences
          </p>
        </div>

        {/* Premium Status */}
        {isPremium && (
          <div className="glass-card p-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500">
            <div className="flex items-center gap-3">
              <Crown className="w-6 h-6 text-white" />
              <div>
                <h3 className="font-semibold text-white">Premium Active</h3>
                <p className="text-white text-opacity-90 text-sm">
                  Enjoying all premium features
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Sections */}
        <div className="space-y-2">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="w-full glass-card p-4 rounded-xl flex items-center justify-between hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-text-primary">
                      {section.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {section.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-secondary" />
              </button>
            );
          })}
        </div>

        {/* Account Actions */}
        <div className="space-y-2">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wide">
            Account
          </h2>
          
          <button className="w-full glass-card p-4 rounded-xl flex items-center justify-between hover:bg-white hover:bg-opacity-10 transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-text-primary">
                  Account Settings
                </h3>
                <p className="text-sm text-text-secondary">
                  Manage your account details
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-text-secondary" />
          </button>

          <button className="w-full glass-card p-4 rounded-xl flex items-center justify-between hover:bg-red-500 hover:bg-opacity-20 transition-all duration-200 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-red-400">
                  Sign Out
                </h3>
                <p className="text-sm text-text-secondary">
                  Disconnect your wallet
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* App Info */}
        <div className="glass-card p-4 rounded-xl text-center">
          <h3 className="font-semibold text-text-primary mb-2">PayNoti</h3>
          <p className="text-sm text-text-secondary mb-1">Version 1.0.0</p>
          <p className="text-xs text-text-secondary">
            Built for Base Mini Apps
          </p>
        </div>
      </div>
    </AppShell>
  );
}
