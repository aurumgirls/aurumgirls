import nodemailer from 'nodemailer';

// Shared Gmail (Nodemailer) setup — import only from server routes. Requires GMAIL_APP_PASSWORD
// — a Google App Password for GMAIL_USER, not the account's normal password.
export const GMAIL_USER = process.env.GMAIL_USER || 'aurumgirls@gmail.com';

export function createGmailTransport() {
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass },
  });
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function stripControlChars(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}
