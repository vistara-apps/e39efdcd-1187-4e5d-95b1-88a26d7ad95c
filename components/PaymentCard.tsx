'use client';

import { Transaction } from '@/lib/types';
import { formatCurrency, formatDate, getPaymentStatus } from '@/lib/utils';
import { ChevronDown, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface PaymentCardProps {
  transaction: Transaction;
  showDetails?: boolean;
  onToggleDetails?: () => void;
}

export function PaymentCard({ transaction, showDetails = false, onToggleDetails }: PaymentCardProps) {
  const status = transaction.dueDate ? getPaymentStatus(transaction.dueDate) : 'completed';
  
  const getStatusIcon = () => {
    switch (status) {
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'due':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'upcoming':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'overdue':
        return 'text-red-600';
      case 'due':
        return 'text-yellow-600';
      case 'upcoming':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="payment-card animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {getStatusIcon()}
            <h3 className="font-medium text-text-primary text-sm">
              {transaction.description}
            </h3>
          </div>
          
          {transaction.dueDate && (
            <p className="text-xs text-text-secondary mb-2">
              Due: {formatDate(transaction.dueDate)}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className={`text-lg font-bold ${getStatusColor()}`}>
              {formatCurrency(transaction.amount, transaction.currency)}
            </span>
            
            {transaction.isRecurring && (
              <span className="notification-bubble">
                Recurring
              </span>
            )}
          </div>
        </div>
        
        {onToggleDetails && (
          <button
            onClick={onToggleDetails}
            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ChevronDown 
              className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                showDetails ? 'rotate-180' : ''
              }`} 
            />
          </button>
        )}
      </div>
      
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Status:</span>
              <p className={`font-medium ${getStatusColor()}`}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </p>
            </div>
            <div>
              <span className="text-text-secondary">Type:</span>
              <p className="font-medium text-text-primary">
                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
              </p>
            </div>
            <div>
              <span className="text-text-secondary">Date:</span>
              <p className="font-medium text-text-primary">
                {formatDate(transaction.date)}
              </p>
            </div>
            <div>
              <span className="text-text-secondary">Account:</span>
              <p className="font-medium text-text-primary">
                {transaction.accountId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
