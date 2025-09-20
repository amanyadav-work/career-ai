import { NextResponse } from 'next/server';
import Roadmap from '@/models/Roadmap';
import { dbConnect } from '@/lib/mongoose';
import { GenerateAiDataGroq } from '@/actions/groq';
import { ROADMAP_GENERATION_PROMPT } from '@/lib/roadmapPrompt';
import { sendErrorResponse } from '@/lib/sendErrorResponse';

export async function POST(req) {
    await dbConnect();
    const { position, skills, prompt } = await req.json();

    // Use extracted prompt for Groq
    const userPrompt = prompt || ROADMAP_GENERATION_PROMPT;
    const messages = [
        { role: 'user', content: `${userPrompt}\n
        This is user's information:\n
        Dream Position: ${position}\n
        Current Skills: ${skills}` },
    ];

    // Call Groq to get roadmap JSON
    const groqRes = await GenerateAiDataGroq(messages);
console.log('Groq Response Type:', typeof groqRes);
console.log('Groq Response:', groqRes);

    if (!groqRes) {
        return sendErrorResponse({
            code: 'invalid_ai_json',
            message: 'AI did not return valid roadmap JSON',
            status: 400
        });
    }


    // Store roadmap in MongoDB
    try {
        const roadmap = await Roadmap.create(groqRes);
        console.log(roadmap)
        console.log(roadmap)
        return NextResponse.json({ ...roadmap._doc });
    } catch (err) {
        return sendErrorResponse({
            code: 'db_error',
            message: 'Failed to save roadmap: ' + err.message,
            status: 500
        });
    }
}

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search') || '';
    
    // If ID is provided, fetch specific roadmap
    if (id) {
        try {
            const roadmap = await Roadmap.findById(id);
            if (!roadmap) {
                return sendErrorResponse({
                    code: 'not_found',
                    message: 'Roadmap not found',
                    status: 404
                });
            }
            return NextResponse.json({ ...roadmap._doc });
        } catch (err) {
            return sendErrorResponse({
                code: 'db_error',
                message: 'Failed to fetch roadmap: ' + err.message,
                status: 500
            });
        }
    }
    
    // Otherwise, fetch all roadmaps with optional search filter
    try {
        let query = {};
        if (search) {
            query = {
                $or: [
                    { roadmapTitle: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            };
        }
        
        const roadmaps = await Roadmap.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ roadmaps });
    } catch (err) {
        return sendErrorResponse({
            code: 'db_error',
            message: 'Failed to fetch roadmaps: ' + err.message,
            status: 500
        });
    }
}
