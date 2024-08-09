import {openai} from '@ai-sdk/openai';
import {streamText, StreamData} from 'ai';

export const maxDuration = 30;

//This Route Handler creates a POST request endpoint at /api/chat
export async function POST(req: Request) {
  const { messages } = await req.json();

  // stream extra data here
  const data = new StreamData();
  data.append({ test: 'value' });

  const result = await streamText({
    model: openai(`gpt-4-turbo`),
    messages,
    onFinish() {
      data.close();
    },
  });

  return result.toDataStreamResponse({ data });
}