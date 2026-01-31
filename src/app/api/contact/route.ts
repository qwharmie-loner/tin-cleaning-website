import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, serviceType, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Store in Supabase
    const { data, error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          service_type: serviceType || null,
          message,
          status: 'new',
        },
      ])
      .select();

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    // Send notification email to admin
    const emailHTML = `
      <h2>New Contact Request from TIN GROUP Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Service Type:</strong> ${serviceType || 'Not specified'}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New contact request from ${name}`,
      html: emailHTML,
      text: `
New Contact Request from TIN GROUP Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Type: ${serviceType || 'Not specified'}

Message:
${message}

Submitted: ${new Date().toLocaleString()}
      `,
    });

    // Optional: Send confirmation email to user
    const confirmationHTML = `
      <h2>Thank you for contacting TIN GROUP SERVICE!</h2>
      <p>Hi ${name},</p>
      <p>We received your request and will get back to you as soon as possible.</p>
      <p><strong>What we received:</strong></p>
      <ul>
        <li>Service: ${serviceType || 'General inquiry'}</li>
        <li>Message: ${message.substring(0, 100)}...</li>
      </ul>
      <p>Best regards,<br>TIN GROUP SERVICE Team</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'We received your request - TIN GROUP SERVICE',
      html: confirmationHTML,
      text: `Thank you for contacting TIN GROUP SERVICE! We received your request and will get back to you as soon as possible.`,
    });

    return NextResponse.json(
      { ok: true, message: 'Request submitted successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
