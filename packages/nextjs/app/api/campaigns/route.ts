import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { campaigns } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, imageUrl, description, goal, deadline, creatorId } = body;

  if (!title || !imageUrl || !description || !goal || !deadline || !creatorId) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    const result = await db.insert(campaigns).values({
      title,
      imageUrl,
      description,
      goal,
      deadline: new Date(deadline),
      creatorId,
    });

    return NextResponse.json(
      { message: 'Campaign created successfully', result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { message: 'Error creating campaign', error },
      { status: 500 }
    );
  }
}

