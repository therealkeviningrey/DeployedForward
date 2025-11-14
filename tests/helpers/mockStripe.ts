import { vi } from 'vitest';
import Stripe from 'stripe';

// Mock Stripe checkout session
export const mockCheckoutSession = (overrides?: Partial<Stripe.Checkout.Session>): Stripe.Checkout.Session => {
  return {
    id: 'cs_test_123',
    object: 'checkout.session',
    mode: 'subscription',
    status: 'complete',
    customer: 'cus_test_123',
    subscription: 'sub_test_123',
    url: 'https://checkout.stripe.com/test',
    ...overrides,
  } as Stripe.Checkout.Session;
};

// Mock Stripe subscription
export const mockSubscription = (overrides?: Partial<Stripe.Subscription>): Stripe.Subscription => {
  return {
    id: 'sub_test_123',
    object: 'subscription',
    customer: 'cus_test_123',
    status: 'active',
    items: {
      object: 'list',
      data: [
        {
          id: 'si_test_123',
          price: {
            id: 'price_test_operator_monthly',
            recurring: { interval: 'month' },
          },
        } as any,
      ],
    },
    current_period_start: Math.floor(Date.now() / 1000),
    current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    ...overrides,
  } as Stripe.Subscription;
};

// Mock Stripe webhook event
export const mockWebhookEvent = (
  type: string,
  data: any
): Stripe.Event => {
  return {
    id: 'evt_test_123',
    object: 'event',
    type,
    data: { object: data },
    created: Math.floor(Date.now() / 1000),
    livemode: false,
    api_version: '2023-10-16',
    pending_webhooks: 0,
    request: { id: null, idempotency_key: null },
  } as Stripe.Event;
};

// Mock Stripe client
export const mockStripeClient = () => {
  return {
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue(mockCheckoutSession()),
        retrieve: vi.fn().mockResolvedValue(mockCheckoutSession()),
      },
    },
    subscriptions: {
      retrieve: vi.fn().mockResolvedValue(mockSubscription()),
      update: vi.fn().mockResolvedValue(mockSubscription()),
      cancel: vi.fn().mockResolvedValue(mockSubscription({ status: 'canceled' })),
    },
    webhooks: {
      constructEvent: vi.fn((payload, sig, secret) => {
        // Simple mock - in real tests you'd verify signature
        return JSON.parse(payload);
      }),
    },
  };
};
