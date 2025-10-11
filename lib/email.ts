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

