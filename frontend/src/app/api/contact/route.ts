import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { isValidName, isValidEmail, isValidPhone } from '@/lib/validation';

const ALLOWED_TOPICS = new Set(['general', 'wholesale', 'press', 'quality', 'where-to-buy']);
const MAX_MESSAGE_LENGTH = 5000;
const MIN_MESSAGE_LENGTH = 10;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
// In-memory per-IP rate limit. Only holds state within a single running
// process and resets on restart/redeploy — fine for a single-instance
// deployment, not a substitute for shared storage (e.g. Redis) if this ever
// runs across multiple serverless instances.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripControlChars(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const topic = typeof body.topic === 'string' ? body.topic.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !phone || !topic || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    if (!isValidName(name)) {
      return NextResponse.json({ message: 'Invalid name' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json({ message: 'Invalid phone number' }, { status: 400 });
    }
    if (!ALLOWED_TOPICS.has(topic)) {
      return NextResponse.json({ message: 'Invalid topic' }, { status: 400 });
    }
    if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { message: `Message must be between ${MIN_MESSAGE_LENGTH} and ${MAX_MESSAGE_LENGTH} characters` },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER || 'xelilovafidan61@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailPass) {
      console.warn('GMAIL_APP_PASSWORD environment variable is not configured.');
      return NextResponse.json(
        { message: 'Gmail App Password is not configured on the server. Please set GMAIL_APP_PASSWORD in .env.local.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const safeName = stripControlChars(name);
    const safeTopic = stripControlChars(topic);
    const phoneStr = phone ? `Phone: ${phone}\n` : '';
    const phoneHtml = phone
      ? `<p style="margin: 12px 0;"><strong>Phone:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>`
      : '';

    const mailOptions = {
      from: { name: `${safeName} (By Aurum Girls Contact)`, address: gmailUser },
      to: 'xelilovafidan61@gmail.com',
      replyTo: email,
      subject: `[Contact Form] ${safeTopic} — ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n${phoneStr}Topic: ${topic}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 16px;">
          <h2 style="color: #2E4B3D; margin-top: 0; border-bottom: 2px solid #D96B43; padding-bottom: 12px;">New Contact Inquiry</h2>
          <p style="margin: 12px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 12px 0;"><strong>User Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          ${phoneHtml}
          <p style="margin: 12px 0;"><strong>Topic:</strong> ${escapeHtml(topic)}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="margin: 8px 0;"><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #f3f4f6; color: #374151;">
            ${escapeHtml(message)}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email via Nodemailer:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    );
  }
}
