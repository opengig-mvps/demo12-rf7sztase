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

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const appointments = await prisma.appointment.findMany({
      where: { userId },
      select: {
        id: true,
        slot: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        videoConferenceUrl: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Appointments fetched successfully!',
      data: appointments,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}