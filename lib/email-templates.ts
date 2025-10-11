// Email HTML templates for Resend

const baseStyles = `
  font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #0D0D0D;
  color: #EAEAEA;
  padding: 40px 20px;
`;

const containerStyles = `
  max-width: 600px;
  margin: 0 auto;
  background-color: #1F1F1F;
  border: 1px solid #565656;
  border-radius: 8px;
  padding: 40px;
`;

const buttonStyles = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #FF6B00;
  color: #0D0D0D;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 14px;
`;

export function welcomeEmailTemplate(name: string, dashboardUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="${baseStyles}">
  <div style="${containerStyles}">
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #FF6B00; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; margin: 0;">
        DEPLOYED FORWARD
      </h1>
    </div>

    <h2 style="font-size: 20px; margin-bottom: 16px;">Welcome aboard, ${name}!</h2>
    
    <p style="color: rgba(234, 234, 234, 0.7); line-height: 1.6; margin-bottom: 24px;">
      You're now part of Deployed Forward. Train where the future is operational.
    </p>

    <p style="color: rgba(234, 234, 234, 0.7); line-height: 1.6; margin-bottom: 32px;">
      Start with field-tested AI workflows. Deploy capability, not experiments.
    </p>

    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${dashboardUrl}" style="${buttonStyles}">Get Started</a>
    </div>

    <div style="border-top: 1px solid #565656; padding-top: 24px; margin-top: 32px;">
      <p style="color: rgba(234, 234, 234, 0.5); font-size: 12px; margin: 0;">
        A Kingsbury Labs venture
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function enrollmentEmailTemplate(courseName: string, courseUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="${baseStyles}">
  <div style="${containerStyles}">
    <h2 style="font-size: 20px; margin-bottom: 16px;">Mission accepted</h2>
    
    <p style="color: rgba(234, 234, 234, 0.7); line-height: 1.6; margin-bottom: 24px;">
      You've enrolled in <strong style="color: #FF6B00;">${courseName}</strong>.
    </p>

    <p style="color: rgba(234, 234, 234, 0.7); line-height: 1.6; margin-bottom: 32px;">
      Your training begins now. Deploy working code, not toy examples.
    </p>

    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${courseUrl}" style="${buttonStyles}">Start Learning</a>
    </div>

    <div style="border-top: 1px solid #565656; padding-top: 24px; margin-top: 32px;">
      <p style="color: rgba(234, 234, 234, 0.5); font-size: 12px; margin: 0;">
        A Kingsbury Labs venture
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function certificateEmailTemplate(
  courseName: string,
  certificateUrl: string,
  userName: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="${baseStyles}">
  <div style="${containerStyles}">
    <h2 style="font-size: 20px; margin-bottom: 16px;">Mission complete!</h2>
    
    <p style="color: rgba(234, 234, 234, 0.7); line-height: 1.6; margin-bottom: 24px;">
      Congratulations, ${userName}. You've completed <strong style="color: #FF6B00;">${courseName}</strong>.
    </p>

    <p style="color: rgba(234, 234, 234, 0.7); line-height: 1.6; margin-bottom: 32px;">
      Your certificate is ready. Proof of capability, not just completion.
    </p>

    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${certificateUrl}" style="${buttonStyles}">Download Certificate</a>
    </div>

    <div style="border-top: 1px solid #565656; padding-top: 24px; margin-top: 32px;">
      <p style="color: rgba(234, 234, 234, 0.5); font-size: 12px; margin: 0;">
        A Kingsbury Labs venture
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function progressReminderTemplate(
  name: string,
  courseTitle: string,
  courseUrl: string,
  completedLessons: number,
  totalLessons: number
): string {
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="${baseStyles}">
  <div style="${containerStyles}">
    <h2 style="font-size: 20px; margin-bottom: 16px;">Keep the momentum, ${name}</h2>
    
    <p style="color: rgba(234, 234, 234, 0.7); line-height: 1.6; margin-bottom: 24px;">
      You're making progress in <strong style="color: #FF6B00;">${courseTitle}</strong>.
    </p>

    <div style="margin-bottom: 32px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: rgba(234, 234, 234, 0.7); font-size: 14px;">
          ${completedLessons} / ${totalLessons} lessons
        </span>
        <span style="color: rgba(234, 234, 234, 0.7); font-size: 14px;">
          ${progressPercent}%
        </span>
      </div>
      <div style="height: 8px; background-color: #565656; border-radius: 4px; overflow: hidden;">
        <div style="height: 100%; width: ${progressPercent}%; background-color: #FF6B00;"></div>
      </div>
    </div>

    <p style="color: rgba(234, 234, 234, 0.7); line-height: 1.6; margin-bottom: 32px;">
      Don't lose your streak. Deploy capability, not excuses.
    </p>

    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${courseUrl}" style="${buttonStyles}">Continue Learning</a>
    </div>

    <div style="border-top: 1px solid #565656; padding-top: 24px; margin-top: 32px;">
      <p style="color: rgba(234, 234, 234, 0.5); font-size: 12px; margin: 0;">
        A Kingsbury Labs venture
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

