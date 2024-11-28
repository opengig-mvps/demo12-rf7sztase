import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from "@/lib/email-service";

type NotificationRequestBody = {
  type: string;
  userId: number;
  message: string;
  appointmentId?: number;
};

export async function POST(request: Request) {
  try {
    const body: NotificationRequestBody = await request.json();

    const { type, userId, message, appointmentId } = body;

    if (!type || !userId || !message) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { email: true }
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const notification = await prisma.notification.create({
      data: {
        type,
        message,
        userId,
        appointmentId: appointmentId ? appointmentId : null,
      },
    });

    await sendEmail({
      to: user.email,
      template: {
        subject: "Video Call Notification",
        html: `<p>${message}</p>`,
        text: message,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Notification sent successfully!",
      data: {
        id: notification.id,
        type: notification.type,
        isRead: notification.isRead,
        userId: notification.userId,
        message: notification.message,
        appointmentId: notification.appointmentId,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error sending notification:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}