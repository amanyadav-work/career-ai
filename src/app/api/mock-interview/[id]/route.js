import { NextResponse } from 'next/server';
import MockInterview from '@/models/MockInterview';
import { verifyToken } from '@/lib/verifyToken';
import { dbConnect } from '@/lib/mongoose';
import { sendErrorResponse } from '@/lib/sendErrorResponse';

export async function GET(req, { params }) {
  await dbConnect();

  const payload = await verifyToken(req);

  if (!payload) {
    return sendErrorResponse({ code: 'unauthorized', message: 'Please Login First', status: 401 });
  }

  const userID = payload.userId;
  const interviewId = params.id;

  try {
    // Fetch the interview by ID and verify it belongs to the current user
    const interview = await MockInterview.findOne({
      _id: interviewId,
      userId: userID
    }).lean();

    if (!interview) {
      return sendErrorResponse({ 
        code: 'interview_not_found', 
        message: 'Interview not found or access denied', 
        status: 404 
      });
    }

    return NextResponse.json(interview, { status: 200 });
  } catch (error) {
    return sendErrorResponse({
      code: 'fetch_failed',
      message: error.message || 'Failed to retrieve interview details',
      status: 500
    });
  }
}

export async function PATCH(req, { params }) {
  await dbConnect();

  const payload = await verifyToken(req);

  if (!payload) {
    return sendErrorResponse({ code: 'unauthorized', message: 'Please Login First', status: 401 });
  }

  const userID = payload.userId;
  const interviewId = params.id;

  try {
    const { status, conversation } = await req.json();
    
    // Find the interview and verify ownership
    const interview = await MockInterview.findOne({
      _id: interviewId,
      userId: userID
    });

    if (!interview) {
      return sendErrorResponse({ 
        code: 'interview_not_found', 
        message: 'Interview not found or access denied', 
        status: 404 
      });
    }

    // Update fields if provided
    if (status) interview.status = status;
    if (conversation) interview.conversation = conversation;
    
    await interview.save();

    return NextResponse.json({
      success: true,
      interview
    }, { status: 200 });
  } catch (error) {
    return sendErrorResponse({
      code: 'update_failed',
      message: error.message || 'Failed to update interview',
      status: 500
    });
  }
}
