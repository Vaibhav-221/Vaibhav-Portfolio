import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const MAX_BODY_SIZE = 12 * 1024;
const requestsByIp = new Map<string, { count: number; resetTime: number }>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

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

function getDateInTimeZone(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function isValidCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().startsWith(value);
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: 'The callback request is too large.' }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (new TextEncoder().encode(rawBody).length > MAX_BODY_SIZE) {
    return NextResponse.json({ error: 'The callback request is too large.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ success: true });
  }

  const { fullName, email, phone, reason, callbackDate, callbackTime, timeZone } = body;
  if (
    typeof fullName !== 'string' ||
    typeof email !== 'string' ||
    typeof phone !== 'string' ||
    typeof reason !== 'string' ||
    typeof callbackDate !== 'string' ||
    typeof callbackTime !== 'string' ||
    typeof timeZone !== 'string'
  ) {
    return NextResponse.json({ error: 'Please complete all callback request fields.' }, { status: 400 });
  }

  const cleanName = fullName.trim();
  const cleanEmail = email.trim();
  const cleanPhone = phone.trim();
  const cleanReason = reason.trim();
  const validDate = isValidCalendarDate(callbackDate);
  const validTime = /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(callbackTime);
  const validPhone = /^[+()\d\s.-]{7,25}$/.test(cleanPhone)
    && (cleanPhone.match(/\d/g)?.length ?? 0) >= 7
    && (cleanPhone.match(/\d/g)?.length ?? 0) <= 15;

  if (
    cleanName.length < 2 || cleanName.length > 100 ||
    cleanEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
    !validPhone ||
    cleanReason.length < 3 || cleanReason.length > 200 ||
    !validDate ||
    !validTime ||
    !timeZone || timeZone.length > 64
  ) {
    return NextResponse.json({ error: 'Please check your details and callback time.' }, { status: 400 });
  }

  let todayInTimeZone: string;
  try {
    todayInTimeZone = getDateInTimeZone(new Date(), timeZone);
  } catch {
    return NextResponse.json({ error: 'Please use a valid time zone and try again.' }, { status: 400 });
  }

  if (callbackDate < todayInTimeZone) {
    return NextResponse.json({ error: 'Choose today or a future date for your callback request.' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many callback requests were sent. Please try again later.' },
      { status: 429, headers: { 'Retry-After': '3600' } }
    );
  }

  const {
    EMAILJS_SERVICE_ID,
    EMAILJS_CALLBACK_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY,
    EMAILJS_PRIVATE_KEY,
  } = process.env;
  if (!EMAILJS_SERVICE_ID || !EMAILJS_CALLBACK_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
    return NextResponse.json(
      { error: 'Callback requests are not configured yet. Please email me directly.' },
      { status: 503 }
    );
  }

  try {
    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_CALLBACK_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: {
          subject: `Callback request from ${cleanName}`,
          full_name: cleanName,
          from_email: cleanEmail,
          reply_to: cleanEmail,
          phone_number: cleanPhone,
          call_reason: cleanReason,
          preferred_callback_date: callbackDate,
          preferred_callback_time: callbackTime,
          time_zone: timeZone,
          submitted_at: new Date().toISOString(),
        },
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });

    if (!emailResponse.ok) {
      const providerMessage = (await emailResponse.text()).slice(0, 500);
      const safeProviderMessage = [EMAILJS_SERVICE_ID, EMAILJS_CALLBACK_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY]
        .filter(Boolean)
        .reduce((message, value) => message.split(value).join('[redacted]'), providerMessage);
      console.error('EmailJS rejected a callback request:', emailResponse.status, safeProviderMessage);
      return NextResponse.json(
        { error: 'Your callback request could not be delivered. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('EmailJS callback request failed:', error instanceof Error ? error.name : 'Unknown error');
    return NextResponse.json(
      { error: 'Callback requests are temporarily unavailable. Please try again later.' },
      { status: 502 }
    );
  }
}