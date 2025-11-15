import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { ensureUserRecord } from '@/lib/users';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session.isAuthenticated || !session.userId) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        { status: 200 },
      );
    }

    const appUser = await ensureUserRecord(session.userId);

    return NextResponse.json(
      {
        authenticated: true,
        userId: session.userId,
        role: appUser.role,
        twoFactorEnabled: Boolean(session.twoFactorEnabled),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Middleware session fetch failed:', error);
    return NextResponse.json(
      {
        authenticated: false,
      },
      { status: 200 },
    );
  }
}

