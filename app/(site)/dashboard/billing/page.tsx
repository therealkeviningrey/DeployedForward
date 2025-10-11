import { redirect } from 'next/navigation';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { TIERS } from '@/lib/stripe';

export const metadata = {
  title: 'Billing',
  description: 'Manage your subscription and billing details.',
};

export default async function BillingPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { subscription: true },
  });

  if (!user) {
    redirect('/login');
  }

  const subscription = user.subscription;

  return (
    <Container size="narrow">
      <div className="py-12">
        <h1 className="mb-8">Billing</h1>

        {subscription ? (
          <>
            {/* Current Plan */}
            <Card className="mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="mb-2">Current Plan</h2>
                  <div className="flex items-center gap-3">
                    <Badge variant="orange">{subscription.tier}</Badge>
                    <Badge>{subscription.status}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-accent">
                    ${TIERS[subscription.tier].monthly}
                  </div>
                  <div className="text-sm text-secondary">per month</div>
                </div>
              </div>

              <div className="grid gap-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-secondary">Current period:</span>
                  <span>
                    {new Date(subscription.currentPeriodStart).toLocaleDateString()} -{' '}
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Seats:</span>
                  <span>{subscription.seats}</span>
                </div>
                {subscription.cancelAtPeriodEnd && (
                  <div className="flex justify-between text-accent">
                    <span>Status:</span>
                    <span>Cancels at period end</span>
                  </div>
                )}
              </div>

              <form action="/api/create-portal" method="POST">
                <button type="submit" className="btn btn-ghost">
                  Manage Subscription
                </button>
              </form>
            </Card>

            {/* Features */}
            <Card>
              <h3 className="mb-4">Plan Features</h3>
              <ul className="flex flex-col gap-2">
                {TIERS[subscription.tier].features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-accent">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </>
        ) : (
          <Card className="text-center">
            <h2 className="mb-4">No Active Subscription</h2>
            <p className="text-secondary mb-6">
              Subscribe to access all courses, missions, and premium features.
            </p>
            <a href="/pricing" className="btn btn-primary">
              View Plans
            </a>
          </Card>
        )}
      </div>
    </Container>
  );
}

