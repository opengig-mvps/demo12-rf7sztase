import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const availableSlots = await prisma.appointment.findMany({
      where: { status: 'available' },
      select: {
        id: true,
        slot: true,
        status: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Available appointment slots fetched successfully!',
      data: availableSlots,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching available appointment slots:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}