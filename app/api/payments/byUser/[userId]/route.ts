import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const payments = await prisma.payment.findMany({
      where: { userId },
      select: {
        id: true,
        amount: true,
        paymentDate: true,
        appointmentId: true,
        paymentStatus: true,
        billingDetails: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User payments fetched successfully!',
      data: payments,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching user payments:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}