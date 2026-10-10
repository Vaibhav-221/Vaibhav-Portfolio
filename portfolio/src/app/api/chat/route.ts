import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse, ChatMessage } from '@/lib/gemini';

// In-memory sliding window rate limiter per client IP for basic DDoS prevention
const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 25; // 25 chat requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    ipRateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Basic IP rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down and try again in a minute.' },
        { status: 429 }
      );
    }

    // 2. Validate content type and parse JSON body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Request body must be a JSON object.' },
        { status: 400 }
      );
    }

    const { message, messages } = body as {
      message?: string;
      messages?: ChatMessage[];
    };

    // 3. Construct and validate chat messages
    let conversation: ChatMessage[] = [];

    if (Array.isArray(messages) && messages.length > 0) {
      conversation = messages
        .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant' || m.role === 'model'))
        .map((m) => ({
          role: m.role === 'model' ? 'assistant' : m.role,
          content: m.content.slice(0, 2000).trim(), // Enforce max 2000 chars per message
        }))
        .filter((m) => m.content.length > 0);
    } else if (typeof message === 'string' && message.trim().length > 0) {
      conversation = [{ role: 'user', content: message.slice(0, 2000).trim() }];
    }

    if (conversation.length === 0) {
      return NextResponse.json(
        { error: 'A non-empty user message is required.' },
        { status: 400 }
      );
    }

    // Enforce sliding window of last 10 messages for bounded history
    const boundedHistory = conversation.slice(-10);

    // Ensure the last message is from the user
    const lastMsg = boundedHistory[boundedHistory.length - 1];
    if (lastMsg.role !== 'user') {
      return NextResponse.json(
        { error: 'The last message in the conversation must be from the user.' },
        { status: 400 }
      );
    }

    // 4. Call server-side Gemini service
    const result = await generateChatResponse(boundedHistory);

    if (result.error) {
      const isConfigError = result.error.includes('GEMINI_API_KEY');
      return NextResponse.json(
        { error: result.error },
        { status: isConfigError ? 503 : 500 }
      );
    }

    return NextResponse.json({
      response: result.text,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('Unhandled Chat API Error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred while processing your request.' },
      { status: 500 }
    );
  }
}

