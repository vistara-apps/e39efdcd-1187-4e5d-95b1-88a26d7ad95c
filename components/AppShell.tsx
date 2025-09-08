'use client';

import { ReactNode } from 'react';
import { Home, Wallet, Clock, User } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  activeTab?: 'home' | 'wallet' | 'history' | 'profile';
}

export function AppShell({ children, activeTab = 'home' }: AppShellProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-white font-semibold text-lg">PayNoti</span>
        </div>
        <button className="text-white text-opacity-70 hover:text-opacity-100 transition-opacity duration-200">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md border-t border-white border-opacity-20">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
