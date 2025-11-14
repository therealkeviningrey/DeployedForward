import { Suspense } from 'react';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { OperatorShell } from '@/components/OperatorShell';

export const metadata = {
  title: 'Checkout Success',
  description: 'Your subscription is now active!',
};

function SuccessContent() {
  return (
    <OperatorShell
      activePath="/checkout/success"
      breadcrumb={[{ label: 'Operations' }, { label: 'checkout/' }, { label: 'success' }]}
      title="Checkout Success"
      subtitle="Your subscription is now active."
    >
      <Container size="narrow">
        <div className="py-16">
          <Card className="text-center">
            <div className="mb-6">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto">
                <circle cx="32" cy="32" r="32" fill="rgba(255, 107, 0, 0.1)" />
                <path
                  d="M20 32L28 40L44 24"
                  stroke="#FF6B00"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="mb-4">Welcome to Deployed Forward!</h1>
            <p className="text-secondary mb-8 text-lg">
              Your subscription is now active. Start training with field-tested AI workflows.
            </p>

            <div className="flex gap-4 justify-center">
              <Link href="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
              <Link href="/dashboard" className="btn btn-ghost">
                Go to Dashboard
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </OperatorShell>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

