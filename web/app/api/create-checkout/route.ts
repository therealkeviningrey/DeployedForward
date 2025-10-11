import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const checkoutSchema = z.object({
  tier: z.enum(['OPERATOR', 'UNIT', 'BATTALION']),
  billingPeriod: z.enum(['monthly', 'annual']),
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { tier, billingPeriod } = checkoutSchema.parse(body);

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      const clerkUser = await (await import('@clerk/nextjs/server')).clerkClient.users.getUser(userId);
      
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        },
      });
    }

    // Get or create Stripe customer
    let stripeCustomerId = user.subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
          clerkId: userId,
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

