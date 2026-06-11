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

      const transporter = nodemailer.createTransport({
        host: NEXT_PUBLIC_SMTP_HOST,
        port: parseInt(NEXT_PUBLIC_SMTP_PORT || '587'),
        secure: NEXT_PUBLIC_SMTP_PORT === '465', // true for 465, false for other ports
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
