import { Container } from '@/components/Container';
import { Prose } from '@/components/Prose';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Deployed Forward.',
};

export default function TermsPage() {
  return (
    <Container size="narrow">
      <Prose>
        <h1>Terms of Service</h1>
        <p className="text-secondary">Last updated: January 2025</p>

        <h2>Agreement</h2>
        <p>
          By accessing Deployed Forward ("Service"), you agree to these Terms. If you disagree, do not use the Service.
        </p>

        <h2>Definitions</h2>
        <ul>
          <li>
            <strong>"You"</strong> means the individual or organization using the Service.
          </li>
          <li>
            <strong>"Content"</strong> means missions, briefs, documentation, and any materials provided by us.
          </li>
          <li>
            <strong>"User Content"</strong> means code, data, or materials you create or upload.
          </li>
        </ul>

        <h2>Use of Service</h2>
        <h3>License</h3>
        <p>
          We grant you a limited, non-exclusive, non-transferable license to access and use the Service for your
          internal business purposes.
        </p>

        <h3>Restrictions</h3>
        <p>You may not:</p>
        <ul>
          <li>Resell or redistribute our Content</li>
          <li>Reverse engineer the platform</li>
          <li>Use the Service for illegal purposes</li>
          <li>Share account credentials</li>
          <li>Scrape or automate access beyond documented APIs</li>
        </ul>

        <h2>Account Responsibilities</h2>
        <p>You are responsible for:</p>
        <ul>
          <li>Maintaining account security</li>
          <li>All activity under your account</li>
          <li>Compliance with applicable laws</li>
          <li>Accurate billing information</li>
        </ul>

        <h2>Payment & Billing</h2>
        <h3>Fees</h3>
        <p>
          You agree to pay the fees for your selected tier. Prices are listed on our Pricing page and may change with
          30 days' notice.
        </p>

        <h3>Billing Cycle</h3>
        <p>
          Monthly plans bill on the same day each month. Annual plans bill on the anniversary of your subscription start
          date.
        </p>

        <h3>Refunds</h3>
        <p>We offer a 30-day money-back guarantee. After 30 days, no refunds for unused portions of your subscription.</p>

        <h2>Intellectual Property</h2>
        <h3>Our Content</h3>
        <p>All Content is our property. You may use it only as authorized by your subscription.</p>

        <h3>Your Content</h3>
        <p>You retain ownership of User Content. You grant us a license to host, display, and use it to provide the Service.</p>

        <h2>Termination</h2>
        <p>We may suspend or terminate your account if you:</p>
        <ul>
          <li>Violate these Terms</li>
          <li>Fail to pay</li>
          <li>Engage in abusive behavior</li>
        </ul>

        <p>You may cancel anytime. No refunds for unused time after the 30-day guarantee period.</p>

        <h2>Disclaimers</h2>
        <p>
          THE SERVICE IS PROVIDED "AS IS." WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE
          SERVICE WILL BE ERROR-FREE OR UNINTERRUPTED.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR LIABILITY IS LIMITED TO THE AMOUNT YOU PAID IN THE LAST 12 MONTHS.
          WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.
        </p>

        <h2>Governing Law</h2>
        <p>These Terms are governed by the laws of Delaware, USA. Disputes will be resolved in Delaware courts.</p>

        <h2>Changes</h2>
        <p>
          We may update these Terms. Material changes will be announced via email 30 days in advance. Continued use
          constitutes acceptance.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email <strong>legal@deployedforward.com</strong>.
        </p>
      </Prose>
    </Container>
  );
}

