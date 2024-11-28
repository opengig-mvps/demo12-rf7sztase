import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from "@/lib/email-service";

type PaymentRequestBody = {
  amount: number;
  userId: number;
  appointmentId: number;
  billingDetails: string;
};

export async function POST(request: Request) {
  try {
    const body: PaymentRequestBody = await request.json();

    const { amount, userId, appointmentId, billingDetails } = body;

    if (!amount || !userId || !appointmentId || !billingDetails) {
      return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment || appointment.userId !== userId) {
      return NextResponse.json({ success: false, message: 'Appointment not found' }, { status: 404 });
    }

    // Simulate payment processing
    const paymentStatus = 'completed';
    const paymentDate = new Date();

    const payment = await prisma.payment.create({
      data: {
        amount,
        paymentStatus,
        paymentDate,
        billingDetails,
        userId,
        appointmentId,
      },
    });

    await sendEmail({
      to: user.email,
      template: {
        subject: "Payment Confirmation",
        html: `<h1>Payment processed successfully!</h1><p>Amount: $${amount}</p>`,
        text: `Payment processed successfully! Amount: $${amount}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment processed successfully!',
      data: {
        id: payment.id,
        amount: payment.amount,
        userId: payment.userId,
        paymentDate: payment.paymentDate.toISOString(),
        appointmentId: payment.appointmentId,
        paymentStatus: payment.paymentStatus,
        billingDetails: payment.billingDetails,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error processing payment:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}