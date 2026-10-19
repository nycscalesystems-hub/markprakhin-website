"use server";

import nodemailer from "nodemailer";

export type ContactState = {
  success: boolean;
  error: string | null;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Simple in-memory rate limit store (resets on cold start / serverless spin-down)
// For production, replace with Redis or Upstash.
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

export async function submitContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot check
  const honeypot = formData.get("website") as string;
  if (honeypot && honeypot.trim() !== "") {
    return { success: true, error: null }; // silently accept to fool bots
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const subject = (formData.get("subject") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || name.length < 2 || name.length > 100) {
    return { success: false, error: "Please enter your name." };
  }
  if (!email || !isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (!message || message.length < 10 || message.length > 3000) {
    return { success: false, error: "Please enter a message (10–3000 characters)." };
  }

  // Basic rate limit by email hash (not perfect but lightweight)
  const key = email.toLowerCase();
  if (isRateLimited(key)) {
    return { success: false, error: "Too many messages sent. Please try again later." };
  }

  const recipientEmail = process.env.CONTACT_EMAIL;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!recipientEmail || !smtpUser || !smtpPass) {
    // Env not configured — log and fail gracefully
    console.error("Contact form: SMTP environment variables not set.");
    return { success: false, error: "Contact form is not configured yet. Please email directly." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: smtpUser, pass: smtpPass },
  });

  const subjectLine = subject
    ? `[markprakhin.com] ${subject}`
    : `[markprakhin.com] Message from ${name}`;

  const htmlBody = `
    <div style="font-family: Georgia, serif; max-width: 600px; color: #1a1a1a;">
      <p style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">New message via markprakhin.com</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
      <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
      <p style="white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"markprakhin.com" <${smtpUser}>`,
    to: recipientEmail,
    replyTo: email,
    subject: subjectLine,
    html: htmlBody,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  return { success: true, error: null };
}
