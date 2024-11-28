import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { appointmentId: string } }
) {
  try {
    const appointmentId = parseInt(params.appointmentId, 10);
    if (isNaN(appointmentId)) {
      return NextResponse.json({ success: false, message: 'Invalid appointment ID' }, { status: 400 });
    }

    const appointment = await prisma.appointment.findFirst({
      where: { id: appointmentId },
      include: {
        user: true,
      },
    });

    if (!appointment) {
      return NextResponse.json({ success: false, message: 'Appointment not found' }, { status: 404 });
    }

    if (appointment.status !== 'confirmed') {
      return NextResponse.json({ success: false, message: 'Appointment is not confirmed' }, { status: 403 });
    }

    const videoConferenceUrl = appointment.videoConferenceUrl;
    if (!videoConferenceUrl) {
      return NextResponse.json({ success: false, message: 'Video conference URL not available' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Video conference URL retrieved successfully!',
      data: { videoConferenceUrl },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error retrieving video conference URL:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}