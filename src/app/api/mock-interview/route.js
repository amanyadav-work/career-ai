import { NextResponse } from 'next/server';
import MockInterview from '@/models/MockInterview';
import { verifyToken } from '@/lib/verifyToken';
import { dbConnect } from '@/lib/mongoose';
import { sendErrorResponse } from '@/lib/sendErrorResponse';

// Get all mock interviews for the logged-in user
export async function GET(req) {
  await dbConnect();

  const payload = await verifyToken(req);

  if (!payload) {
    return sendErrorResponse({ code: 'unauthorized', message: 'Please Login First', status: 401 });
  }

  const userID = payload.userId;

  // Fetch all mock interviews for this user
  const interviews = await MockInterview.find({ userId: userID }).sort({ createdAt: -1 }).lean();

  return NextResponse.json(interviews, { status: 200 });
}

// Create a new mock interview
export async function POST(req) {
  await dbConnect();

  const payload = await verifyToken(req);

  if (!payload) {
    return sendErrorResponse({ code: 'unauthorized', message: 'Please Login First', status: 401 });
  }

  try {
    const userID = payload.userId;
    const data = await req.json();
    
    // Create new interview with user ID
    const newInterview = new MockInterview({
      userId: userID,
      title: data.title,
      jobRole: data.jobRole,
      skills: data.skills,
      difficulty: data.difficulty,
      notes: data.notes || ""
    });

    await newInterview.save();
    
    return NextResponse.json(newInterview, { status: 201 });
  } catch (error) {
    return sendErrorResponse({ 
      code: 'interview_creation_failed', 
      message: error.message, 
      status: 400 
    });
  }
}

// Update an existing mock interview
export async function PATCH(req) {
  await dbConnect();

  const payload = await verifyToken(req);

  if (!payload) {
    return sendErrorResponse({ code: 'unauthorized', message: 'Please Login First', status: 401 });
  }

  try {
    const userID = payload.userId;
    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) {
      return sendErrorResponse({ 
        code: 'invalid_request', 
        message: 'Interview ID is required', 
        status: 400 
      });
    }

    // Find the interview and ensure it belongs to the user
    const interview = await MockInterview.findOne({ 
      _id: id, 
      userId: userID 
    });

    if (!interview) {
      return sendErrorResponse({ 
        code: 'not_found', 
        message: 'Interview not found or you do not have permission to update it', 
        status: 404 
      });
    }

    // Handle conversation updates
    if (updateData.newMessage) {
      const { role, content } = updateData.newMessage;
      if (!interview.conversation) {
        interview.conversation = [];
      }
      interview.conversation.push({
        role,
        content,
        timestamp: new Date()
      });
      // Remove from updateData as we've handled it separately
      delete updateData.newMessage;
    }

    // Update other fields
    Object.keys(updateData).forEach(key => {
      interview[key] = updateData[key];
    });

    await interview.save();
    
    return NextResponse.json(interview, { status: 200 });
  } catch (error) {
    return sendErrorResponse({ 
      code: 'interview_update_failed', 
      message: error.message, 
      status: 400 
    });
  }
}
