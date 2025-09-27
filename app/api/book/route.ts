import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const bookingData = await request.json();
    
    // Simulate booking processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock successful booking response
    const bookingId = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // In a real app, this would be a real payment gateway URL
    const mockPaymentUrl = `https://payment-gateway.example.com/pay/${bookingId}`;

    return NextResponse.json({
      success: true,
      booking_id: bookingId,
      payment_url: mockPaymentUrl,
      message: 'Booking confirmed successfully'
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}