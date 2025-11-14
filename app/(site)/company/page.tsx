import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { OperatorShell } from '@/components/OperatorShell';

export const metadata = {
  title: 'Company',
  description: 'Our mission is to democratize AI skills through hands-on education. A Kingsbury Labs venture.',
};

export default function CompanyPage() {
  return (
    <OperatorShell
      activePath="/company"
      breadcrumb={[{ label: 'Operations' }, { label: 'company/' }]}
      title="Company"
      subtitle="Making AI skills accessible to everyone"
    >
      <Container size="narrow">
        <Hero
          title="Making AI skills accessible to everyone"
          subtitle="We believe anyone can learn to build with AI, regardless of their technical background."
        />

        <section className="py-12">
          <h2 className="mb-4">Our mission</h2>
          <p className="text-secondary text-lg leading-relaxed mb-4">
            Most AI education is either too theoretical (endless tutorials) or too intimidating (assumes you're already a developer). We're building a different approach.
          </p>
          <p className="text-secondary text-lg leading-relaxed">
            Deployed Forward teaches AI skills through hands-on projects. You don't watch 40 hours of videos - you build real products from day one. No coding background required.
          </p>
        </section>

        <Divider />

        <section className="py-12">
          <h2 className="mb-6">Our approach</h2>
          <div className="grid gap-4">
            <Card>
              <h3 className="mb-2">Build real projects, not toy examples</h3>
              <p className="text-secondary">
                Every lesson ends with a working product you can deploy and share. Landing pages, chatbots, web apps - things you'll actually use and be proud of.
              </p>
            </Card>
            <Card>
              <h3 className="mb-2">Learn by doing, not watching</h3>
              <p className="text-secondary">
                We keep video lectures under 10 minutes. The rest is you building, deploying, and iterating. Hands-on practice beats passive consumption.
              </p>
            </Card>
            <Card>
              <h3 className="mb-2">Measure progress through shipping</h3>
              <p className="text-secondary">
                Your progress is measured by what you ship, not quiz scores. Build a portfolio of real projects that demonstrate your capabilities.
              </p>
            </Card>
          </div>
        </section>

        <Divider />

        <section className="py-12">
          <h2 className="mb-4">Who we are</h2>
          <p className="text-secondary leading-relaxed mb-6">
            Deployed Forward is built by educators and practitioners who've taught thousands of students to build with AI. We've seen what works and what doesn't in AI education.
          </p>
          <p className="text-secondary leading-relaxed mb-6">
            Our courses are designed for real people with busy schedules - not full-time students. Learn at your own pace, apply skills immediately, and ship real products.
          </p>
          <p className="text-secondary text-sm" id="attribution">
            A <strong>Kingsbury Labs</strong> venture.
          </p>
        </section>

        <Divider />

        <section className="py-12" id="community">
          <h2 className="mb-4">Community</h2>
          <p className="text-secondary leading-relaxed mb-4">
            Join hundreds of students learning to build with AI. Share your projects, get feedback, find accountability partners, and celebrate wins together.
          </p>
          <p className="text-secondary leading-relaxed">
            Our community includes product managers, marketers, founders, designers, and career switchers - not just developers.
          </p>
        </section>

        <Divider />

        <section className="py-12" id="careers">
          <h2 className="mb-4">Careers</h2>
          <p className="text-secondary leading-relaxed">
            We're a small team focused on creating the best AI learning experience. When we're hiring, we'll post here.
          </p>
        </section>

        <Divider />

        <section className="py-12" id="security">
          <h2 className="mb-4">Privacy & security</h2>
          <p className="text-secondary leading-relaxed mb-4">
            We take your data seriously. All course materials and student data are encrypted. We never sell your information or share it with third parties.
          </p>
          <p className="text-secondary leading-relaxed">
            Questions about privacy or security? Email <strong>privacy@deployedforward.com</strong> and we'll respond within 24 hours.
          </p>
        </section>
      </Container>
    </OperatorShell>
  );
}
