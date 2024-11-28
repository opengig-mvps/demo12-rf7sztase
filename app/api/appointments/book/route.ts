import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from "@/lib/email-service";

type BookAppointmentRequestBody = {
  slotId: number;
  userId: number;
};

export async function POST(request: Request) {
  try {
    const body: BookAppointmentRequestBody = await request.json();

    const { slotId, userId } = body;

    if (isNaN(slotId) || isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid slot ID or user ID' }, { status: 400 });
    }

    const appointmentSlot = await prisma.appointment.findFirst({
      where: { id: slotId, status: 'pending' },
    });

    if (!appointmentSlot) {
      return NextResponse.json({ success: false, message: 'Slot not available' }, { status: 404 });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const updatedAppointment = await prisma.appointment.updateMany({
      where: { id: slotId },
      data: { status: 'booked', userId },
    });

    if (updatedAppointment.count === 0) {
      return NextResponse.json({ success: false, message: 'Failed to book appointment' }, { status: 500 });
    }

    await prisma.notification.create({
      data: {
        type: 'Appointment',
        message: 'Your appointment has been booked successfully!',
        userId,
        appointmentId: slotId,
      },
    });

    await sendEmail({
      to: user.email,
      template: {
        subject: "Appointment Confirmation",
        html: "<h1>Your appointment has been booked successfully!</h1>",
        text: "Your appointment has been booked successfully!",
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Appointment booked successfully!',
      data: {
        id: slotId,
        slot: appointmentSlot.slot.toISOString(),
        status: 'booked',
        userId,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error booking appointment:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}