import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';

export const metadata = {
  title: 'Company',
  description: 'Mission, principles, and attribution. Deployed Forward is a Kingsbury Labs venture.',
};

export default function CompanyPage() {
  return (
    <Container size="narrow">
      <Hero title="Company" subtitle="Train where the future is operational." />

      <section className="py-12">
        <h2 className="mb-4">Mission</h2>
        <p className="text-secondary text-lg leading-relaxed">
          Most teams experiment with AI. Few operationalize it. We build the platform for repeatable AI advantage —
          field-tested workflows, not theory.
        </p>
      </section>

      <Divider />

      <section className="py-12">
        <h2 className="mb-6">Principles</h2>
        <div className="grid gap-4">
          <Card>
            <h3 className="mb-2">Deploy, don't theorize</h3>
            <p className="text-secondary">
              Every mission produces working code. No toy examples. No concepts without context. You deploy capability or
              you didn't learn it.
            </p>
          </Card>
          <Card>
            <h3 className="mb-2">Patterns, not prescriptions</h3>
            <p className="text-secondary">
              We teach repeatable workflows, not rigid rules. You adapt them to your stack, your team, your constraints.
            </p>
          </Card>
          <Card>
            <h3 className="mb-2">Measure outcomes</h3>
            <p className="text-secondary">
              Training without measurement is hope. We track what you ship, how fast, and how consistently. Prove
              capability, don't assume it.
            </p>
          </Card>
        </div>
      </section>

      <Divider />

      <section className="py-12">
        <h2 className="mb-4">Team</h2>
        <p className="text-secondary leading-relaxed mb-6">
          Deployed Forward is built by operators who've shipped production AI systems. We're not educators — we're
          practitioners who got tired of training that didn't transfer to real codebases.
        </p>
        <p className="text-secondary text-sm" id="attribution">
          A <strong>Kingsbury Labs</strong> venture.
        </p>
      </section>

      <Divider />

      <section className="py-12" id="careers">
        <h2 className="mb-4">Careers</h2>
        <p className="text-secondary leading-relaxed">
          We're a lean team. When we're hiring, we'll post here. For now, focus on building capability.
        </p>
      </section>

      <Divider />

      <section className="py-12" id="security">
        <h2 className="mb-4">Security</h2>
        <p className="text-secondary leading-relaxed mb-4">
          Production systems require production security. We follow SOC 2 Type II standards, encrypt data at rest and in
          transit, and conduct regular penetration testing.
        </p>
        <p className="text-secondary leading-relaxed">
          Found a vulnerability? Email <strong>security@deployedforward.com</strong> with details. We respond within 24
          hours.
        </p>
      </section>
    </Container>
  );
}

