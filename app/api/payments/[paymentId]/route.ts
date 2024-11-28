import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { paymentId: string } }
) {
  try {
    const paymentId = parseInt(params.paymentId, 10);
    if (isNaN(paymentId)) {
      return NextResponse.json({ success: false, message: 'Invalid payment ID' }, { status: 400 });
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      select: {
        id: true,
        amount: true,
        userId: true,
        paymentDate: true,
        appointmentId: true,
        paymentStatus: true,
        billingDetails: true,
      },
    });

    if (!payment) {
      return NextResponse.json({ success: false, message: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment details fetched successfully!',
      data: payment,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching payment details:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}