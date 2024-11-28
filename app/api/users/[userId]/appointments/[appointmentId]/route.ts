import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type AppointmentUpdateRequestBody = {
  status: string;
  videoConferenceUrl: string;
};

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string; appointmentId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const appointmentId = parseInt(params.appointmentId, 10);

    if (isNaN(userId) || isNaN(appointmentId)) {
      return NextResponse.json({ success: false, message: 'Invalid user or appointment ID' }, { status: 400 });
    }

    const body: AppointmentUpdateRequestBody = await request.json();
    const { status, videoConferenceUrl } = body;

    const appointment = await prisma.appointment.findFirst({
      where: { id: appointmentId, userId },
    });

    if (!appointment) {
      return NextResponse.json({ success: false, message: 'Appointment not found' }, { status: 404 });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status,
        videoConferenceUrl,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Appointment updated successfully!',
      data: {
        id: updatedAppointment.id,
        slot: updatedAppointment.slot.toISOString(),
        status: updatedAppointment.status,
        createdAt: updatedAppointment.createdAt.toISOString(),
        updatedAt: updatedAppointment.updatedAt.toISOString(),
        videoConferenceUrl: updatedAppointment.videoConferenceUrl,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}