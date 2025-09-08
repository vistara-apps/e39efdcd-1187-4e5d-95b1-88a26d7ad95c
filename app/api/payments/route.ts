import { NextRequest, NextResponse } from 'next/server';
import { mockPaymentSummary, mockTransactions } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get('wallet');
    const type = searchParams.get('type');

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
    }

    // In a real app, this would fetch from database based on wallet address
    let data;
    
    switch (type) {
      case 'summary':
        data = mockPaymentSummary;
        break;
      case 'upcoming':
        data = mockPaymentSummary.upcomingPayments;
        break;
      case 'recent':
        data = mockPaymentSummary.recentTransactions;
        break;
      case 'subscriptions':
        data = mockPaymentSummary.subscriptions;
        break;
      default:
        data = mockTransactions;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Payments API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress, description, amount, currency, dueDate, isRecurring } = body;

    if (!walletAddress || !description || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In a real app, this would save to database
    const newTransaction = {
      transactionId: Date.now().toString(),
      accountId: 'acc1',
      userId: walletAddress,
      description,
      amount: parseFloat(amount),
      currency: currency || 'USD',
      type: 'payment' as const,
      date: new Date().toISOString().split('T')[0],
      status: 'pending' as const,
      isRecurring: isRecurring || false,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
    };

    return NextResponse.json({ 
      success: true, 
      data: newTransaction,
      message: 'Payment added successfully'
    });
  } catch (error) {
    console.error('Add payment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
