import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body: ContactPayload = await req.json();

    // Basic server-side validation
    if (!body || !body.firstName || !body.lastName || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

    // Temporary logging for debugging environment variable availability
    // Note: this logs only presence, not secret values.
    // eslint-disable-next-line no-console
    console.log('GMAIL_USER exists:', !!GMAIL_USER);
    // eslint-disable-next-line no-console
    console.log('GMAIL_APP_PASSWORD exists:', !!GMAIL_APP_PASSWORD);

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      return NextResponse.json({ error: 'Email server not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${body.firstName} ${body.lastName} <${GMAIL_USER}>`,
      to: 'anoziechisom62@gmail.com',
      subject: `Contact form submission from ${body.firstName} ${body.lastName}`,
      text: `Name: ${body.firstName} ${body.lastName}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
      html: `<p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p><p><strong>Email:</strong> ${body.email}</p><p><strong>Message:</strong></p><p>${body.message.replace(/\n/g, '<br/>')}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Log the error server-side (avoid exposing internals to client)
    // eslint-disable-next-line no-console
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
