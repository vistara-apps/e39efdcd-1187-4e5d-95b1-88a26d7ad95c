'use client';

import { PaymentNotification } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { AlertCircle, Clock, TrendingUp, X } from 'lucide-react';

interface NotificationBubbleProps {
  notification: PaymentNotification;
  onDismiss?: (id: string) => void;
}

export function NotificationBubble({ notification, onDismiss }: NotificationBubbleProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'reminder':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      case 'anomaly':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'reminder':
        return 'bg-blue-500';
      case 'overdue':
        return 'bg-red-500';
      case 'anomaly':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className={`${getBackgroundColor()} text-white p-4 rounded-lg shadow-lg animate-slide-up`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">
              {notification.title}
            </h4>
            <p className="text-sm text-white text-opacity-90 mb-2">
              {notification.message}
            </p>
            {notification.amount && (
              <p className="text-lg font-bold">
                {formatCurrency(notification.amount)}
              </p>
            )}
          </div>
        </div>
        
        {onDismiss && (
          <button
            onClick={() => onDismiss(notification.id)}
            className="text-white text-opacity-70 hover:text-opacity-100 transition-opacity duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
