import { Resend } from 'resend';
import {
  welcomeEmailTemplate,
  enrollmentEmailTemplate,
  certificateEmailTemplate,
  progressReminderTemplate,
} from './email-templates';

// Lazy initialize Resend to avoid build-time errors
let resend: Resend | null = null;
function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const fromEmail = process.env.RESEND_FROM_EMAIL || 'hello@deployedforward.com';

export async function sendWelcomeEmail(to: string, name: string) {
  const client = getResendClient();
  if (!client) {
    console.warn('Resend not configured, skipping email');
    return;
  }

  try {
    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

    await client.emails.send({
      from: fromEmail,
      to,
      subject: 'Welcome to Deployed Forward',
      html: welcomeEmailTemplate(name, dashboardUrl),
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}

export async function sendEnrollmentEmail(to: string, courseName: string) {
  const client = getResendClient();
  if (!client) {
    console.warn('Resend not configured, skipping email');
    return;
  }

  try {
    const courseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/courses`;

    await client.emails.send({
      from: fromEmail,
      to,
      subject: `Enrolled in ${courseName}`,
      html: enrollmentEmailTemplate(courseName, courseUrl),
    });
  } catch (error) {
    console.error('Failed to send enrollment email:', error);
  }
}

export async function sendCertificateEmail(to: string, courseName: string, certificateUrl: string, userName: string) {
  const client = getResendClient();
  if (!client) {
    console.warn('Resend not configured, skipping email');
    return;
  }

  try {
    await client.emails.send({
      from: fromEmail,
      to,
      subject: `Certificate earned: ${courseName}`,
      html: certificateEmailTemplate(courseName, certificateUrl, userName),
    });
  } catch (error) {
    console.error('Failed to send certificate email:', error);
  }
}

export async function sendProgressReminder(
  to: string,
  name: string,
  courseTitle: string,
  completedLessons: number,
  totalLessons: number
) {
  const client = getResendClient();
  if (!client) {
    console.warn('Resend not configured, skipping email');
    return;
  }

  try {
    const courseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/courses`;

    await client.emails.send({
      from: fromEmail,
      to,
      subject: 'Continue your mission',
      html: progressReminderTemplate(name, courseTitle, courseUrl, completedLessons, totalLessons),
    });
  } catch (error) {
    console.error('Failed to send progress reminder:', error);
  }
}

export async function sendPasswordResetEmail(to: string, name: string, resetUrl: string) {
  const client = getResendClient();
  if (!client) {
    console.warn('Resend not configured, skipping password reset email');
    return;
  }

  try {
    const appName = 'Deployed Forward';
    const html = `
      <div style="font-family: 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #f9fafb; background: #050505; padding: 32px;">
        <h2 style="margin: 0 0 16px; font-size: 22px;">Reset your password</h2>
        <p style="margin: 0 0 16px;">
          Hi ${name || 'Operator'},
        </p>
        <p style="margin: 0 0 16px;">
          You recently requested to reset your ${appName} password. Click the button below to choose a new password.
        </p>
        <p style="margin: 0 0 16px;">
          <a href="${resetUrl}" style="background-color: #ff6b00; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; display: inline-block; font-weight: 600;">
            Reset password
          </a>
        </p>
        <p style="margin: 0 0 16px; color: #9ca3af; font-size: 14px;">
          If you did not request this, you can safely ignore this email. This link will expire shortly for security reasons.
        </p>
        <p style="margin: 24px 0 0; color: #9ca3af; font-size: 14px;">
          — The ${appName} team
        </p>
      </div>
    `;

    await client.emails.send({
      from: fromEmail,
      to,
      subject: 'Reset your Deployed Forward password',
      html,
    });
  } catch (error) {
    console.error('Failed to send password reset email:', error);
  }
}

export async function sendTwoFactorCodeEmail(to: string, name: string, code: string) {
  const client = getResendClient();
  if (!client) {
    console.warn('Resend not configured, skipping two-factor email');
    return;
  }

  const safeName = name || 'Operator';

  const html = `
    <div style="font-family: 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #f9fafb; background: #050505; padding: 32px;">
      <h1 style="margin: 0 0 16px; font-size: 20px;">Two-factor authentication</h1>
      <p>Hi ${safeName},</p>
      <p>Your one-time security code is:</p>
      <p style="font-size: 28px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; margin: 24px 0;">
        ${code}
      </p>
      <p>Enter this code in Deployed Forward to finish signing in. It expires in a few minutes, so use it soon.</p>
      <p style="margin-top: 32px; font-size: 12px; color: #9ca3af;">
        If you didn’t request this, please reset your password immediately from the security settings page.
      </p>
    </div>
  `;

  try {
    await client.emails.send({
      from: fromEmail,
      to,
      subject: 'Your Deployed Forward security code',
      html,
    });
  } catch (error) {
    console.error('Failed to send two-factor email:', error);
  }
}

