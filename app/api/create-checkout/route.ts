import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { ensureUserRecord } from '@/lib/users';
import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';

const checkoutSchema = z.object({
  tier: z.enum(['OPERATOR', 'UNIT', 'BATTALION']),
  billingPeriod: z.enum(['monthly', 'annual']),
  couponCode: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session.isAuthenticated || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { tier, billingPeriod } = checkoutSchema.parse(body);

    const userRecord = await ensureUserRecord(session.userId);
    const user = await prisma.user.findUnique({
      where: { id: userRecord.id },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get or create Stripe customer
    let stripeCustomerId = user.subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
          clerkId: session.userId,
        },
      });
      stripeCustomerId = customer.id;
    }

    // Map tier and billing period to price ID
    const priceId = getPriceId(tier, billingPeriod);

    if (!priceId) {
      return NextResponse.json({ error: 'Invalid tier or billing period' }, { status: 400 });
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId: user.id,
        tier,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.errors }, { status: 400 });
    }

    console.error('Checkout creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function getPriceId(tier: string, billingPeriod: string): string | null {
  const priceMap: Record<string, string> = {
    'OPERATOR_monthly': process.env.STRIPE_OPERATOR_MONTHLY_PRICE_ID || '',
    'OPERATOR_annual': process.env.STRIPE_OPERATOR_ANNUAL_PRICE_ID || '',
    'UNIT_monthly': process.env.STRIPE_UNIT_MONTHLY_PRICE_ID || '',
    'UNIT_annual': process.env.STRIPE_UNIT_ANNUAL_PRICE_ID || '',
    'BATTALION_monthly': process.env.STRIPE_BATTALION_MONTHLY_PRICE_ID || '',
    'BATTALION_annual': process.env.STRIPE_BATTALION_ANNUAL_PRICE_ID || '',
  };

  return priceMap[`${tier}_${billingPeriod}`] || null;
}
