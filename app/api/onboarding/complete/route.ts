import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureUserRecord } from '@/lib/users';
import { getAuthSession } from '@/lib/auth';

/**
 * POST /api/onboarding/complete
 *
 * Marks the user's onboarding as complete
 * Used when user finishes the onboarding wizard
 */
export async function POST() {
  try {
    const session = await getAuthSession();
    if (!session.isAuthenticated || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure user record exists in database
    const user = await ensureUserRecord(session.userId);

    // Mark onboarding as complete
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        onboardingCompletedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      onboardingCompletedAt: updatedUser.onboardingCompletedAt,
    });
  } catch (error) {
    console.error('Onboarding completion error:', error);
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
}
