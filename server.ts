import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API to send confirmation email
  app.post("/api/send-email", async (req, res) => {
    try {
      const { name, email, role } = req.body;

      if (!email || !name) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      // We need SMTP credentials to send the email
      // Let's use a standard SMTP configuration
      // The user will need to provide SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env
      const { NEXT_PUBLIC_SMTP_HOST, NEXT_PUBLIC_SMTP_PORT, NEXT_PUBLIC_SMTP_USER, NEXT_PUBLIC_SMTP_PASS, NEXT_PUBLIC_FROM_EMAIL } = process.env;

      if (!NEXT_PUBLIC_SMTP_HOST || !NEXT_PUBLIC_SMTP_USER || !NEXT_PUBLIC_SMTP_PASS) {
        // Fallback or warning if SMTP not configured
        console.warn("SMTP credentials not configured. Please add NEXT_PUBLIC_SMTP_HOST, NEXT_PUBLIC_SMTP_USER, NEXT_PUBLIC_SMTP_PASS to .env");
        return res.status(500).json({ error: "Email configuration missing on server." });
      }

      const isGmail = NEXT_PUBLIC_SMTP_HOST?.includes('gmail.com');
      
      const transporter = isGmail ? nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: NEXT_PUBLIC_SMTP_USER,
          pass: NEXT_PUBLIC_SMTP_PASS,
        },
      }) : nodemailer.createTransport({
        host: NEXT_PUBLIC_SMTP_HOST,
        port: parseInt(NEXT_PUBLIC_SMTP_PORT || '587'),
        secure: NEXT_PUBLIC_SMTP_PORT === '465', // true for 465, false for other ports
        auth: {
          user: NEXT_PUBLIC_SMTP_USER,
          pass: NEXT_PUBLIC_SMTP_PASS,
        },
      });

      const htmlContent = `
<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; line-height: 1.6; color: #1F1F1F; max-width: 600px; margin: 0 auto; background-color: #F8F5F0; padding: 40px 20px;">
  
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #1F1F1F; font-size: 28px; margin: 0 0 8px 0; font-weight: 700;">
      Welcome to the <span style="color: #22C55E;">Nomad</span> Movement
    </h1>
    <p style="color: #555; font-size: 18px; margin: 0;">
      You're now part of the future of live events.
    </p>
  </div>

  <!-- Main Content -->
  <div style="background-color: #FFFFFF; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
    
    <p style="font-size: 18px; margin-bottom: 24px;">
      Hi <strong>${name}</strong>,
    </p>
    
    <p style="font-size: 17px; margin-bottom: 28px;">
      Thank you for joining the <strong>Nomad Waitlist</strong> as an <strong>${role}</strong>! You're now among the first to experience the platform that's revolutionizing live events in India.
    </p>

    <!-- Benefits Box -->
    <div style="background-color: #F8F5F0; border-left: 5px solid #22C55E; padding: 24px; margin: 28px 0; border-radius: 8px;">
      <p style="margin: 0 0 16px 0; font-weight: 600; color: #1F1F1F;">As an early member, you’ll get:</p>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.7;">
        <li>Early access to the Nomad platform before the public launch</li>
        <li><strong>Free Premium Organizer plan</strong> for your first event</li>
        <li>Exclusive founder updates and behind-the-scenes sneak peeks</li>
        <li>Priority support and the ability to help shape the product</li>
      </ul>
    </div>

    <p style="font-size: 17px; margin-bottom: 20px;">
      We’re building something truly fresh — a gamified experience that turns passive events into addictive adventures with proximity missions, real token rewards, and complete control for organizers.
    </p>

    <p style="font-size: 17px; margin-bottom: 32px;">
      Get ready for a new era of live events where every attendee is engaged, every booth gets traffic, and every organizer has powerful tools at their fingertips.
    </p>

    <!-- Next Steps -->
    <div style="margin: 32px 0;">
      <p style="font-weight: 600; margin-bottom: 12px;">What happens next?</p>
      <p style="margin: 0; color: #555;">
        We’ll keep you updated with exciting progress, beta invites, and early access opportunities. The first spots are limited — the earlier you refer friends, the higher your priority.
      </p>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 35px 0;">
      <a href="https://linktr.ee/nomad.live" 
         style="background-color: #22C55E; color: #FFFFFF; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 17px; display: inline-block;">
        Follow our socials →
      </a>
    </div>

    <p style="text-align: center; color: #777; font-size: 15px; margin-top: 40px;">
      Made with passion in India 💚
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 40px; color: #888; font-size: 13px;">
    <p style="margin: 0 0 8px 0;">
      © 2026 Nomad • Gamifying Live Events
    </p>
    <p style="margin: 0;">
      You received this email because you joined the Nomad waitlist.
    </p>
  </div>

</div>
`;

      const info = await transporter.sendMail({
        from: `Nomad Events <${NEXT_PUBLIC_FROM_EMAIL || NEXT_PUBLIC_SMTP_USER}>`,
        to: email,
        subject: "Welcome to the Nomad Waitlist!",
        text: `Hi ${name},\n\nYou are officially on the Nomad waitlist. We will reach out when the platform is ready.\n\nBest,\nThe Nomad Team`,
        html: htmlContent,
      });

      console.log("Message sent: %s", info.messageId);
      res.json({ success: true, messageId: info.messageId });
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
