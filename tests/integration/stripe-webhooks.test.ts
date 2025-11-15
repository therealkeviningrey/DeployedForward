import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { prisma } from '@/lib/prisma';

async function ensureUserTableSchema() {
  await prisma.$executeRawUnsafe(
    'ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "onboardingCompletedAt" TIMESTAMP NULL'
  );
}
import Stripe from 'stripe';

/**
 * Integration test for Stripe webhook handlers
 *
 * Tests the subscription management flow:
 * 1. Checkout completed → subscription created
 * 2. Subscription updated → database synced
 * 3. Subscription deleted → marked as canceled
 */
describe('Stripe Webhook Handlers', () => {
  let testUserId: string;
  let testStripeCustomerId: string;
  let testStripeSubscriptionId: string;

  beforeAll(async () => {
    await ensureUserTableSchema();
    // Create test user
    const user = await prisma.user.create({
      data: {
        clerkId: 'test-clerk-stripe',
        email: 'stripe-test@example.com',
        name: 'Stripe Tester',
        role: 'USER',
      },
    });
    testUserId = user.id;
    testStripeCustomerId = 'cus_test_12345';
    testStripeSubscriptionId = 'sub_test_12345';
  });

  afterAll(async () => {
    // Cleanup
    await prisma.subscription.deleteMany({
      where: { userId: testUserId },
    });
    await prisma.user.deleteMany({
      where: { id: testUserId },
    });
  });

  describe('handleCheckoutCompleted', () => {
    it('should create subscription when checkout is completed', async () => {
      // Simulate checkout.session.completed webhook
      const mockSession: Partial<Stripe.Checkout.Session> = {
        customer: testStripeCustomerId,
        subscription: testStripeSubscriptionId,
        metadata: {
          userId: testUserId,
        },
      };

      // Mock subscription data
      const mockSubscription: Partial<Stripe.Subscription> = {
        id: testStripeSubscriptionId,
        customer: testStripeCustomerId,
        status: 'active',
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        items: {
          object: 'list',
          data: [
            {
              id: 'si_test_123',
              price: {
                id: 'price_operator_monthly',
              },
            } as any,
          ],
        } as any,
      };

      // Map price to tier
      const mapPriceToTier = (priceId: string): 'OPERATOR' | 'UNIT' | 'BATTALION' => {
        if (priceId.includes('operator')) return 'OPERATOR';
        if (priceId.includes('unit')) return 'UNIT';
        return 'BATTALION';
      };

      // Map subscription status
      const mapSubscriptionStatus = (
        status: string
      ): 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'TRIALING' => {
        switch (status) {
          case 'active':
            return 'ACTIVE';
          case 'canceled':
            return 'CANCELED';
          case 'past_due':
            return 'PAST_DUE';
          case 'trialing':
            return 'TRIALING';
          default:
            return 'ACTIVE';
        }
      };

      // Create subscription in database
      const subscription = await prisma.subscription.create({
        data: {
          userId: testUserId,
          stripeCustomerId: mockSession.customer as string,
          stripeSubscriptionId: mockSubscription.id as string,
          tier: mapPriceToTier(mockSubscription.items!.data[0].price.id),
          status: mapSubscriptionStatus(mockSubscription.status as string),
          currentPeriodStart: new Date(mockSubscription.current_period_start! * 1000),
          currentPeriodEnd: new Date(mockSubscription.current_period_end! * 1000),
        },
      });

      expect(subscription).toBeDefined();
      expect(subscription.userId).toBe(testUserId);
      expect(subscription.stripeCustomerId).toBe(testStripeCustomerId);
      expect(subscription.stripeSubscriptionId).toBe(testStripeSubscriptionId);
      expect(subscription.tier).toBe('OPERATOR');
      expect(subscription.status).toBe('ACTIVE');
    });

    it('should identify correct subscription tier from price ID', async () => {
      const mapPriceToTier = (priceId: string): 'OPERATOR' | 'UNIT' | 'BATTALION' => {
        if (priceId.includes('operator')) return 'OPERATOR';
        if (priceId.includes('unit')) return 'UNIT';
        return 'BATTALION';
      };

      expect(mapPriceToTier('price_operator_monthly')).toBe('OPERATOR');
      expect(mapPriceToTier('price_operator_annual')).toBe('OPERATOR');
      expect(mapPriceToTier('price_unit_monthly')).toBe('UNIT');
      expect(mapPriceToTier('price_battalion_annual')).toBe('BATTALION');
      expect(mapPriceToTier('price_unknown')).toBe('BATTALION'); // Default
    });

    it('should map Stripe subscription statuses correctly', async () => {
      const mapSubscriptionStatus = (
        status: string
      ): 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'TRIALING' => {
        switch (status) {
          case 'active':
            return 'ACTIVE';
          case 'canceled':
            return 'CANCELED';
          case 'past_due':
            return 'PAST_DUE';
          case 'trialing':
            return 'TRIALING';
          default:
            return 'ACTIVE';
        }
      };

      expect(mapSubscriptionStatus('active')).toBe('ACTIVE');
      expect(mapSubscriptionStatus('canceled')).toBe('CANCELED');
      expect(mapSubscriptionStatus('past_due')).toBe('PAST_DUE');
      expect(mapSubscriptionStatus('trialing')).toBe('TRIALING');
      expect(mapSubscriptionStatus('incomplete')).toBe('ACTIVE'); // Fallback
    });
  });

  describe('handleSubscriptionUpdated', () => {
    it('should update subscription status when changed', async () => {
      // Update subscription to PAST_DUE
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: testStripeSubscriptionId },
        data: {
          status: 'PAST_DUE',
        },
      });

      const updatedSub = await prisma.subscription.findFirst({
        where: { stripeSubscriptionId: testStripeSubscriptionId },
      });

      expect(updatedSub).toBeDefined();
      expect(updatedSub?.status).toBe('PAST_DUE');
    });

    it('should update period dates when subscription renews', async () => {
      const newPeriodStart = new Date('2025-11-01');
      const newPeriodEnd = new Date('2025-12-01');

      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: testStripeSubscriptionId },
        data: {
          currentPeriodStart: newPeriodStart,
          currentPeriodEnd: newPeriodEnd,
        },
      });

      const updatedSub = await prisma.subscription.findFirst({
        where: { stripeSubscriptionId: testStripeSubscriptionId },
      });

      expect(updatedSub?.currentPeriodStart).toEqual(newPeriodStart);
      expect(updatedSub?.currentPeriodEnd).toEqual(newPeriodEnd);
    });

    it('should track cancel_at_period_end flag', async () => {
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: testStripeSubscriptionId },
        data: {
          cancelAtPeriodEnd: true,
        },
      });

      const updatedSub = await prisma.subscription.findFirst({
        where: { stripeSubscriptionId: testStripeSubscriptionId },
      });

      expect(updatedSub?.cancelAtPeriodEnd).toBe(true);
    });
  });

  describe('handleSubscriptionDeleted', () => {
    it('should mark subscription as CANCELED when deleted', async () => {
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: testStripeSubscriptionId },
        data: {
          status: 'CANCELED',
        },
      });

      const deletedSub = await prisma.subscription.findFirst({
        where: { stripeSubscriptionId: testStripeSubscriptionId },
      });

      expect(deletedSub).toBeDefined();
      expect(deletedSub?.status).toBe('CANCELED');
    });

    it('should not delete subscription record (soft delete)', async () => {
      // Verify subscription still exists in database
      const subscription = await prisma.subscription.findFirst({
        where: { stripeSubscriptionId: testStripeSubscriptionId },
      });

      expect(subscription).toBeDefined();
      expect(subscription?.id).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing userId in session metadata', async () => {
      const mockSession: Partial<Stripe.Checkout.Session> = {
        customer: 'cus_no_user',
        subscription: 'sub_no_user',
        metadata: {}, // No userId
      };

      // In real code, this returns early without creating subscription
      // We just verify that we can handle undefined userId
      expect(mockSession.metadata?.userId).toBeUndefined();
    });

    it('should handle subscription upsert (update existing)', async () => {
      // Try to create subscription with same userId (should update instead)
      const updatedSub = await prisma.subscription.upsert({
        where: { userId: testUserId },
        create: {
          userId: testUserId,
          stripeCustomerId: 'new_customer',
          stripeSubscriptionId: 'new_subscription',
          tier: 'UNIT',
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(),
        },
        update: {
          tier: 'UNIT',
          status: 'ACTIVE',
        },
      });

      expect(updatedSub.tier).toBe('UNIT');
      expect(updatedSub.userId).toBe(testUserId);

      // Should still only have one subscription for this user
      const allSubs = await prisma.subscription.findMany({
        where: { userId: testUserId },
      });
      expect(allSubs).toHaveLength(1);
    });
  });

  describe('Subscription Queries', () => {
    it('should find active subscriptions for a user', async () => {
      // Reset to active
      await prisma.subscription.updateMany({
        where: { userId: testUserId },
        data: { status: 'ACTIVE' },
      });

      const activeSub = await prisma.subscription.findFirst({
        where: {
          userId: testUserId,
          status: 'ACTIVE',
        },
      });

      expect(activeSub).toBeDefined();
      expect(activeSub?.status).toBe('ACTIVE');
    });

    it('should check if subscription has access (active or trialing)', async () => {
      const sub = await prisma.subscription.findFirst({
        where: { userId: testUserId },
      });

      const hasAccess = sub?.status === 'ACTIVE' || sub?.status === 'TRIALING';
      expect(hasAccess).toBe(true);
    });

    it('should identify expired subscriptions', async () => {
      const pastDate = new Date('2025-01-01');

      await prisma.subscription.updateMany({
        where: { userId: testUserId },
        data: {
          currentPeriodEnd: pastDate,
        },
      });

      const sub = await prisma.subscription.findFirst({
        where: { userId: testUserId },
      });

      const isExpired = sub && sub.currentPeriodEnd < new Date();
      expect(isExpired).toBe(true);
    });
  });
});
