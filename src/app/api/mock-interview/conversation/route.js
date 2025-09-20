import { NextResponse } from 'next/server';
import MockInterview from '@/models/MockInterview';
import { verifyToken } from '@/lib/verifyToken';
import { dbConnect } from '@/lib/mongoose';
import { sendErrorResponse } from '@/lib/sendErrorResponse';
import { GenerateAiDataGroq } from '@/actions/groq';
import { buildSystemPrompt, buildFormattingPrompt } from '@/lib/AI-InterviewerPrompt';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});
// ELEVENLABS_VOICE_ID, ELEVENLABS_API_KEY is in env file already

async function generateSpeech(text) {
  try {
    const audioStream = await elevenlabs.textToSpeech.convert(
      process.env.ELEVENLABS_VOICE_ID,     // voiceId as first arg (string)
      {
        text: text,
        modelId: "eleven_turbo_v2",        // correct naming (modelId)
        voiceSettings: {                   // ensure correct naming
          stability: 0.5,
          similarityBoost: 0.75,
          style: 0.5,
          useSpeakerBoost: true,
        },
        // Optionally: output_format or optimize_streaming_latency etc, if needed
      }
    );

    // The convert() method returns a stream (Readable) per docs. :contentReference[oaicite:4]{index=4}

    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);
    const base64 = audioBuffer.toString('base64');
    return base64;
  } catch (error) {
    console.error('Error generating speech:', error);
    return null;
  }
}



export async function POST(req) {
  await dbConnect();

  const payload = await verifyToken(req);

  if (!payload) {
    return sendErrorResponse({ code: 'unauthorized', message: 'Please Login First', status: 401 });
  }

  const userID = payload.userId;

  try {
    const { interviewId, transcript, allAnimations } = await req.json();

    // Fetch the interview by ID and verify it belongs to the current user
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

    // Add user's message to conversation
    interview.conversation.push({
      role: 'user',
      content: transcript,
      timestamp: new Date()
    });

    await interview.save();

    // Prepare conversation history for AI
    const messages = interview.conversation.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Generate system prompt
    const systemPrompt = buildSystemPrompt({
      jobRole: interview.jobRole,
      difficulty: interview.difficulty,
      skills: interview.skills,
      notes: interview.notes
    }, allAnimations);

    // Generate AI response
    let aiResponse = await GenerateAiDataGroq(messages, systemPrompt, null, true);

    // Validate AI response format
    let isValidJson = false;

    try {
      // If it's a string, try to parse it
      if (typeof aiResponse === 'string') {
        aiResponse = JSON.parse(aiResponse);
      }

      // Check if response has the required fields
      isValidJson = aiResponse &&
        typeof aiResponse === 'object' &&
        'statement' in aiResponse &&
        'animationToPlay' in aiResponse &&
        'isCompleted' in aiResponse;
    } catch (e) {
      console.log('First AI response is not valid JSON, will try formatting:', e);
      isValidJson = false;
    }

    // If the response is not valid JSON, make a second AI call to format it
    if (!isValidJson) {
      const AiStatement = aiResponse;
      aiResponse = {
        statement: AiStatement,
        animationToPlay: 'talk',
        isCompleted: false,
      }
      // const rawResponse = typeof aiResponse === 'string' ?
      //   aiResponse : JSON.stringify(aiResponse);

      // const formattingPrompt = buildFormattingPrompt(rawResponse, JSON.stringify(allAnimations));

      // try {
      //   // Second AI call to fix formatting
      //   const formattedResponse = await GenerateAiDataGroq(
      //     [{ role: 'user', content: formattingPrompt }],
      //     "You are a helpful assistant that formats text into valid JSON."
      //   );

      //   // Parse the formatted response
      //   if (typeof formattedResponse === 'string') {
      //     aiResponse = JSON.parse(formattedResponse);
      //   } else {
      //     aiResponse = formattedResponse;
      //   }
      // } catch (formatError) {
      //   console.error('Failed to format AI response:', formatError);
      //   throw new Error('Failed to generate properly formatted AI response');
      // }
    }

    if (!aiResponse || !aiResponse.statement) {
      throw new Error('Failed to generate AI response');
    }

    // Generate audio for the AI response
    let audioBase64 = null;
    try {
      audioBase64 = await generateSpeech(aiResponse.statement);
    } catch (speechError) {
      console.error('Failed to generate speech:', speechError);
      // Continue without audio if speech generation fails
    }

    // Add AI response to conversation
    interview.conversation.push({
      role: 'assistant',
      content: aiResponse.statement,
      timestamp: new Date()
    });

    // Update interview status if the AI indicates completion
    if (aiResponse.isCompleted) {
      interview.status = 'completed';
    }

    await interview.save();

    return NextResponse.json({
      success: true,
      aiResponse,
      audioBase64,
      conversation: interview.conversation
    }, { status: 200 });

  } catch (error) {
    console.error('Interview conversation error:', error);
    return sendErrorResponse({
      code: 'conversation_failed',
      message: error.message || 'Failed to process interview conversation',
      status: 500
    });
  }
}
