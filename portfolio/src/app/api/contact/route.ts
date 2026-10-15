import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_BODY_SIZE = 8 * 1024;
const requestsByIp = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  for (const [knownIp, entry] of requestsByIp) {
    if (now >= entry.resetTime) requestsByIp.delete(knownIp);
  }

  const entry = requestsByIp.get(ip);
  if (!entry || now >= entry.resetTime) {
    requestsByIp.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return true;
  entry.count += 1;
  return false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: 'The submitted message is too large.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, subject, message, website } = body;
  if (typeof website === 'string' && website.trim()) {
    return NextResponse.json({ success: true });
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string'
  ) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanSubject = subject.trim();
  const cleanMessage = message.trim();

  if (
    !cleanName || cleanName.length > 100 ||
    !cleanEmail || cleanEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
    cleanSubject.length > 160 ||
    !cleanMessage || cleanMessage.length > 5000
  ) {
    return NextResponse.json({ error: 'Please check the form fields and try again.' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages were sent. Please try again in a minute.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } = process.env;
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
    return NextResponse.json(
      { error: 'The contact form is not configured yet. Please try again later.' },
      { status: 503 }
    );
  }

  try {
    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: cleanName,
          from_email: cleanEmail,
          reply_to: cleanEmail,
          subject: cleanSubject || `Portfolio message from ${cleanName}`,
          message: cleanMessage,
        },
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });

    if (!emailResponse.ok) {
      const providerMessage = (await emailResponse.text()).slice(0, 500);
      const safeProviderMessage = [EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY]
        .filter(Boolean)
        .reduce((message, value) => message.split(value).join('[redacted]'), providerMessage);
      console.error('EmailJS rejected a contact form request:', emailResponse.status, safeProviderMessage);
      return NextResponse.json(
        { error: 'Email delivery failed. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('EmailJS contact request failed:', error instanceof Error ? error.name : 'Unknown error');
    return NextResponse.json(
      { error: 'Email delivery is temporarily unavailable. Please try again later.' },
      { status: 502 }
    );
  }
}