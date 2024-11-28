import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

type HealthDataRequestBody = {
  goals: any;
  metrics: any;
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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        healthData: true,
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    if (!user.healthData) {
      return NextResponse.json({ success: false, message: 'No health data available', data: {} }, { status: 200 });
    }

    const healthData = user.healthData;
    
    const cipherMetrics = crypto.createCipheriv('aes-256-cbc', Buffer.from('encryptionKey', 'utf8'), Buffer.alloc(16, 0));
    const encryptedMetrics = Buffer.concat([cipherMetrics.update(JSON.stringify(healthData.metrics), 'utf8'), cipherMetrics.final()]).toString('hex');

    const cipherGoals = crypto.createCipheriv('aes-256-cbc', Buffer.from('encryptionKey', 'utf8'), Buffer.alloc(16, 0));
    const encryptedGoals = Buffer.concat([cipherGoals.update(JSON.stringify(healthData.goals), 'utf8'), cipherGoals.final()]).toString('hex');

    return NextResponse.json({
      success: true,
      message: 'Health data fetched successfully!',
      data: {
        metrics: encryptedMetrics,
        goals: encryptedGoals,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching health data:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
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

    const body: HealthDataRequestBody = await request.json();
    const { goals, metrics } = body;

    if (!goals || !metrics) {
      return NextResponse.json({ success: false, message: 'Goals and metrics are required' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    await prisma.healthData.updateMany({
      where: { userId: userId },
      data: {
        goals,
        metrics,
        updatedAt: new Date().toISOString(),
      },
    });

    const updatedHealthData = await prisma.healthData.findFirst({
      where: { userId: userId },
    });

    return NextResponse.json({
      success: true,
      message: 'Health data updated successfully!',
      data: updatedHealthData,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating health data:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}