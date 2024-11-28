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

    const appointments = await prisma.appointment.findMany({
      where: { userId, status: 'booked' },
      select: {
        id: true,
        slot: true,
        status: true,
        videoConferenceUrl: true,
      },
    });

    const formattedAppointments = appointments.map((appointment) => ({
      id: appointment.id,
      slot: appointment.slot.toISOString(),
      status: appointment.status,
      videoConferenceUrl: appointment.videoConferenceUrl,
    }));

    return NextResponse.json({
      success: true,
      message: 'Booked appointments fetched successfully!',
      data: formattedAppointments,
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}