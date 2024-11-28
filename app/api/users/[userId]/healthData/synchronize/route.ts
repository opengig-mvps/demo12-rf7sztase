import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from "@/lib/email-service";

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Validate and parse the userId parameter
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    // Fetch the user to ensure they exist
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Fetch the latest health data from the EHR system (mocked here)
    const latestHealthData = {
      metrics: {}, // Replace with actual data
      goals: {}, // Replace with actual data
    };

    // Update the user's health data in the database
    const updatedHealthData = await prisma.healthData.update({
      where: { userId: userId },
      data: {
        metrics: latestHealthData.metrics,
        goals: latestHealthData.goals,
        updatedAt: new Date(),
      },
    });

    // Send a notification to the user about the update
    await sendEmail({
      to: user.email,
      template: {
        subject: "Health Data Update",
        html: "<p>Your health data has been updated successfully.</p>",
        text: "Your health data has been updated successfully.",
      },
    });

    // Send a success response with the updated health data
    return NextResponse.json({
      success: true,
      message: 'Health data synchronized successfully!',
      data: {
        id: updatedHealthData.id,
        goals: updatedHealthData.goals,
        userId: userId,
        metrics: updatedHealthData.metrics,
        createdAt: updatedHealthData.createdAt,
        updatedAt: updatedHealthData.updatedAt,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error synchronizing health data:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}