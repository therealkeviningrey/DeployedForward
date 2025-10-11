import { Container } from '@/components/Container';
import { Prose } from '@/components/Prose';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Deployed Forward collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <Container size="narrow">
      <Prose>
        <h1>Privacy Policy</h1>
        <p className="text-secondary">Last updated: January 2025</p>

        <h2>Overview</h2>
        <p>
          Deployed Forward ("we," "our," or "us") collects and processes personal data to provide our operational
          intelligence platform. This policy explains what we collect, why, and your rights.
        </p>

        <h2>Data We Collect</h2>
        <h3>Account Information</h3>
        <p>When you create an account, we collect:</p>
        <ul>
          <li>Name and email address</li>
          <li>Organization name (if applicable)</li>
          <li>Authentication credentials (hashed)</li>
        </ul>

        <h3>Usage Data</h3>
        <p>We track how you use the platform to improve our service:</p>
        <ul>
          <li>Missions completed and progress</li>
          <li>CLI and API usage patterns</li>
          <li>Feature interactions and errors</li>
        </ul>

        <h3>Technical Data</h3>
        <ul>
          <li>IP address and device information</li>
          <li>Browser type and version</li>
          <li>Cookies and local storage</li>
        </ul>

        <h2>How We Use Your Data</h2>
        <ul>
          <li>
            <strong>Service Delivery</strong> — Provide access to missions, track progress, and deliver personalized
            training.
          </li>
          <li>
            <strong>Communication</strong> — Send transactional emails (enrollment confirmations, certificates) and
            optional product updates.
          </li>
          <li>
            <strong>Analytics</strong> — Improve the platform based on usage patterns.
          </li>
          <li>
            <strong>Security</strong> — Detect abuse, prevent fraud, and enforce our terms.
          </li>
        </ul>

        <h2>Data Sharing</h2>
        <p>We do not sell your data. We share it only with:</p>
        <ul>
          <li>
            <strong>Service Providers</strong> — Clerk (auth), Stripe (payments), Vercel (hosting), Neon (database).
          </li>
          <li>
            <strong>Legal Requirements</strong> — When required by law or to protect our rights.
          </li>
        </ul>

        <h2>Data Retention</h2>
        <p>
          We retain your data while your account is active. After deletion, we keep logs for 90 days for security
          purposes.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your data</li>
          <li>Correct inaccuracies</li>
          <li>Request deletion</li>
          <li>Export your data</li>
          <li>Opt out of marketing emails</li>
        </ul>

        <p>
          To exercise these rights, email <strong>privacy@deployedforward.com</strong>.
        </p>

        <h2>Security</h2>
        <p>
          We encrypt data at rest and in transit, follow SOC 2 Type II standards, and conduct regular security audits.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy. Material changes will be announced via email. Continued use constitutes acceptance.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email <strong>legal@deployedforward.com</strong>.
        </p>
      </Prose>
    </Container>
  );
}

