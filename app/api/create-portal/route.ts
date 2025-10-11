import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find user with subscription
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { subscription: true },
    });

    if (!user || !user.subscription?.stripeCustomerId) {
      return NextResponse.json({ error: 'No active subscription' }, { status: 404 });
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: user.subscription.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error('Portal creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

