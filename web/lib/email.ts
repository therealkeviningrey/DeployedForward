import { Resend } from 'resend';
import {
  welcomeEmailTemplate,
  enrollmentEmailTemplate,
  certificateEmailTemplate,
  progressReminderTemplate,
} from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || 'hello@deployedforward.com';

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

    await resend.emails.send({
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
  try {
    const courseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/courses`;

    await resend.emails.send({
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
  try {
    await resend.emails.send({
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
  try {
    const courseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/courses`;

    await resend.emails.send({
      from: fromEmail,
      to,
      subject: 'Continue your mission',
      html: progressReminderTemplate(name, courseTitle, courseUrl, completedLessons, totalLessons),
    });
  } catch (error) {
    console.error('Failed to send progress reminder:', error);
  }
}

