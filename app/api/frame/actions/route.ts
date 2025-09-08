import { NextRequest, NextResponse } from 'next/server';
import { verifyFrameRequest } from '@coinbase/onchainkit/frame';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Verify the frame request
    const isValid = await verifyFrameRequest(body);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid frame request' }, { status: 400 });
    }

    const { buttonIndex, inputText, fid } = body.untrustedData;
    const action = body.untrustedData.buttonIndex;

    switch (action) {
      case 1: // Mark as Paid
        return handleMarkAsPaid(body);
      case 2: // View Details
        return handleViewDetails(body);
      case 3: // Add Payment
        return handleAddPayment(body);
      case 4: // Settings
        return handleSettings(body);
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Frame action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleMarkAsPaid(body: any) {
  // In a real app, this would update the database
  // For now, we'll return a success response
  return NextResponse.json({
    type: 'frame',
    frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/success?action=paid`,
  });
}

async function handleViewDetails(body: any) {
  return NextResponse.json({
    type: 'frame',
    frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/details`,
  });
}

async function handleAddPayment(body: any) {
  return NextResponse.json({
    type: 'frame',
    frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/add-payment`,
  });
}

async function handleSettings(body: any) {
  return NextResponse.json({
    type: 'frame',
    frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/settings`,
  });
}
