import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS handled by Vercel implicitly if same origin, but just in case
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, role } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const { 
      NEXT_PUBLIC_SMTP_HOST, 
      NEXT_PUBLIC_SMTP_PORT, 
      NEXT_PUBLIC_SMTP_USER, 
      NEXT_PUBLIC_SMTP_PASS, 
      NEXT_PUBLIC_FROM_EMAIL 
    } = process.env;

    if (!NEXT_PUBLIC_SMTP_HOST || !NEXT_PUBLIC_SMTP_USER || !NEXT_PUBLIC_SMTP_PASS) {
      console.warn("SMTP credentials not configured.");
      return res.status(500).json({ error: "Email configuration missing on server." });
    }

    const transporter = nodemailer.createTransport({
      host: NEXT_PUBLIC_SMTP_HOST,
      port: parseInt(NEXT_PUBLIC_SMTP_PORT || '587'),
      secure: NEXT_PUBLIC_SMTP_PORT === '465',
      auth: {
        user: NEXT_PUBLIC_SMTP_USER,
        pass: NEXT_PUBLIC_SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `Nomad Events <${NEXT_PUBLIC_FROM_EMAIL || NEXT_PUBLIC_SMTP_USER}>`,
      to: email,
      subject: "Welcome to the Nomad Waitlist!",
      text: `Hi ${name},\n\nYou are officially on the Nomad waitlist. We will reach out when the platform is ready.\n\nBest,\nThe Nomad Team`,
      html: `<p>Hi <b>${name}</b>,</p><p>You are officially on the Nomad waitlist!</p><p>We will reach out as soon as the platform is ready for you to experience.</p><br/><p>Best,<br/>The Nomad Team</p>`,
    });

    console.log("Message sent via Vercel Function: %s", info.messageId);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
