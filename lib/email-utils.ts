import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

/**
 * Create a nodemailer transporter from environment variables
 */
export function createEmailTransporter(): Transporter {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpHost || !smtpUser || !smtpPassword) {
    throw new Error(
      'Missing SMTP configuration. Please set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD environment variables.'
    );
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });
}

interface EmailOptions {
  to: string;
  subject: string;
  filename: string;
  pdfBuffer: Buffer;
  title: string;
}

/**
 * Send a PDF to Kindle email address
 */
export async function sendPdfToKindle(options: EmailOptions): Promise<void> {
  const transporter = createEmailTransporter();

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      text: `Blog post: ${options.title}`,
      html: `<p>Blog post: <strong>${escapeHtml(options.title)}</strong></p>`,
      attachments: [
        {
          filename: options.filename,
          content: options.pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    console.log(`[v0] Email sent successfully to ${options.to}`);
  } catch (error) {
    console.error('[v0] Error sending email:', error);
    throw new Error(`Failed to send email to ${options.to}`);
  }
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}
