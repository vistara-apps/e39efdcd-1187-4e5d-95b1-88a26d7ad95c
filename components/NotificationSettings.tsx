'use client';

import { useState } from 'react';
import { ArrowLeft, Bell, Mail, Smartphone, Clock } from 'lucide-react';

interface NotificationSettingsProps {
  onBack: () => void;
}

export function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    reminderDays: 2,
    overdueAlerts: true,
    anomalyDetection: true,
    weeklyReports: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleReminderDaysChange = (days: number) => {
    setSettings(prev => ({
      ...prev,
      reminderDays: days
    }));
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
          <h1 className="text-xl font-bold text-white">Notifications</h1>
          <p className="text-white text-opacity-80 text-sm">
            Manage your payment alerts
          </p>
        </div>
      </div>

      {/* Notification Types */}
      <div className="space-y-4">
        <h2 className="text-white font-semibold">Notification Methods</h2>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="font-medium text-text-primary">Push Notifications</h3>
                <p className="text-sm text-text-secondary">
                  Get instant alerts on your device
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('pushNotifications')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.pushNotifications 
                  ? 'bg-blue-500' 
                  : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.pushNotifications 
                  ? 'translate-x-6' 
                  : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-400" />
              <div>
                <h3 className="font-medium text-text-primary">Email Notifications</h3>
                <p className="text-sm text-text-secondary">
                  Receive alerts via email
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.emailNotifications 
                  ? 'bg-blue-500' 
                  : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.emailNotifications 
                  ? 'translate-x-6' 
                  : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Reminder Settings */}
      <div className="space-y-4">
        <h2 className="text-white font-semibold">Reminder Settings</h2>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-yellow-400" />
            <div>
              <h3 className="font-medium text-text-primary">Reminder Timing</h3>
              <p className="text-sm text-text-secondary">
                How many days before due date
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {[1, 2, 3, 7].map(days => (
              <button
                key={days}
                onClick={() => handleReminderDaysChange(days)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  settings.reminderDays === days
                    ? 'bg-blue-500 text-white'
                    : 'bg-white bg-opacity-20 text-text-primary hover:bg-opacity-30'
                }`}
              >
                {days} day{days > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Types */}
      <div className="space-y-4">
        <h2 className="text-white font-semibold">Alert Types</h2>
        
        <div className="space-y-3">
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-text-primary">Overdue Alerts</h3>
                <p className="text-sm text-text-secondary">
                  Get notified about missed payments
                </p>
              </div>
              <button
                onClick={() => handleToggle('overdueAlerts')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.overdueAlerts 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.overdueAlerts 
                    ? 'translate-x-6' 
                    : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-text-primary">Anomaly Detection</h3>
                <p className="text-sm text-text-secondary">
                  Alerts for unusual spending patterns
                </p>
              </div>
              <button
                onClick={() => handleToggle('anomalyDetection')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.anomalyDetection 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.anomalyDetection 
                    ? 'translate-x-6' 
                    : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-text-primary">Weekly Reports</h3>
                <p className="text-sm text-text-secondary">
                  Summary of your payment activity
                </p>
              </div>
              <button
                onClick={() => handleToggle('weeklyReports')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.weeklyReports 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.weeklyReports 
                    ? 'translate-x-6' 
                    : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full primary-button">
        Save Settings
      </button>
    </div>
  );
}
