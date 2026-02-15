import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = (
  subject: string,
  topic: string,
  name: string,
  style: string
) => `You are ${name}, a knowledgeable tutor in a text chat with a student. Teach about the topic and subject.

Tutor guidelines:
- Stick to the topic: ${topic} and subject: ${subject}.
- Keep your style ${style}.
- Keep responses concise and helpful.`;

export async function POST(req: Request) {
  try {
    const { messages, subject, topic, name, style } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chat is not configured. Add OPENAI_API_KEY to enable text chat.' },
        { status: 503 }
      );
    }
    const systemContent = SYSTEM_PROMPT(
      subject ?? 'general',
      topic ?? 'learning',
      name ?? 'Tutor',
      style ?? 'friendly'
    );
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemContent },
          ...(Array.isArray(messages) ? messages : []),
        ],
        max_tokens: 500,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err || 'OpenAI request failed' }, { status: res.status });
    }
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? '';
    return NextResponse.json({ content });
  } catch (e) {
    console.error('Chat API error:', e);
    return NextResponse.json({ error: 'Chat request failed' }, { status: 500 });
  }
}
