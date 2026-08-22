import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, topic, message } = body;

    if (!name || !email || !phone || !topic || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
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

    const phoneStr = phone ? `Phone: ${phone}\n` : '';
    const phoneHtml = phone ? `<p style="margin: 12px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : '';

    const mailOptions = {
      from: `"${name} (By Aurum Girls Contact)" <${gmailUser}>`,
      to: 'xelilovafidan61@gmail.com',
      replyTo: email,
      subject: `[Contact Form] ${topic} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n${phoneStr}Topic: ${topic}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 16px;">
          <h2 style="color: #2E4B3D; margin-top: 0; border-bottom: 2px solid #D96B43; padding-bottom: 12px;">New Contact Inquiry</h2>
          <p style="margin: 12px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 12px 0;"><strong>User Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phoneHtml}
          <p style="margin: 12px 0;"><strong>Topic:</strong> ${topic}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="margin: 8px 0;"><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #f3f4f6; color: #374151;">
            ${message}
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
