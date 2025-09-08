import { NextRequest, NextResponse } from 'next/server';
import { mockNotifications } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get('wallet');
    const unreadOnly = searchParams.get('unread') === 'true';

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
    }

    // In a real app, this would fetch from database based on wallet address
    let notifications = mockNotifications;
    
    if (unreadOnly) {
      notifications = notifications.filter(n => !n.isRead);
    }

    return NextResponse.json({ success: true, data: notifications });
  } catch (error) {
    console.error('Notifications API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { notificationId, isRead } = body;

    if (!notificationId) {
      return NextResponse.json({ error: 'Notification ID required' }, { status: 400 });
    }

    // In a real app, this would update the database
    const updatedNotification = mockNotifications.find(n => n.id === notificationId);
    if (updatedNotification) {
      updatedNotification.isRead = isRead;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Notification updated successfully'
    });
  } catch (error) {
    console.error('Update notification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress, deviceToken, preferences } = body;

    if (!walletAddress || !deviceToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In a real app, this would save notification preferences to database
    // and register the device token with push notification service
    
    return NextResponse.json({ 
      success: true, 
      message: 'Notification preferences updated successfully'
    });
  } catch (error) {
    console.error('Update notification preferences error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
