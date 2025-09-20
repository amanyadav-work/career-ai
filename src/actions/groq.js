'use server';

import { parseAiJsonResponse } from '@/lib/utils';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GenerateAiDataGroq(
  messages,
  systemPrompt = `You are a supportive and professional AI career coach. Speak like a friendly mentor...`,
  image,
  ignoreFormat = false,
) {
  if (!Array.isArray(messages)) {
    throw new Error('Invalid input: messages must be an array.');
  }

  const fullMessages = messages.map((msg, index) => {
    if (image && image.length > 0 && msg.role === 'user' && index === messages.length - 1) {
      return {
        role: 'user',
        content: [
          { type: 'text', text: msg.content },
          { type: 'image_url', image_url: { url: image } },
        ],
      };
    }
    return msg;
  });

  fullMessages.unshift({ role: 'system', content: systemPrompt });

  try {
    const completion = await groq.chat.completions.create({
      messages: fullMessages,
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      stream: false,
    });

     const raw = completion.choices[0].message.content.trim();
    const parsed = parseAiJsonResponse(raw,ignoreFormat);
    return parsed;
  } catch (error) {
    console.error('[GROQ AI ERROR]', error);
    throw new Error('Failed to generate or parse response.');
  }
}


