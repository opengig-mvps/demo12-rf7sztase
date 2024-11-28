import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email-service';

type GroupDiscussionRequestBody = {
  content: string;
  attachments: any;
};

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const messages = await prisma.message.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        attachments: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Messages fetched successfully!',
      data: messages,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const body: GroupDiscussionRequestBody = await request.json();
    const { content, attachments } = body;

    if (!content) {
      return NextResponse.json({ success: false, message: 'Content is required' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const discussion = await prisma.message.create({
      data: {
        userId,
        content,
        attachments,
      },
    });

    await sendEmail({
      to: user.email,
      template: {
        subject: 'New Group Discussion Created',
        html: `<p>A new group discussion has been created by you.</p>`,
        text: 'A new group discussion has been created by you.',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Group discussion created successfully!',
      data: {
        id: discussion.id,
        userId: discussion.userId,
        content: discussion.content,
        createdAt: discussion.createdAt.toISOString(),
        updatedAt: discussion.updatedAt.toISOString(),
        attachments: discussion.attachments,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating group discussion:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}