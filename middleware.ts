import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { betterAuth } from '@/lib/auth/better-auth';
import { ensureUserRecord } from '@/lib/users';

const PUBLIC_ROUTE_PATTERNS: RegExp[] = [
  /^\/$/,
  /^\/product(?:\/.*)?$/,
  /^\/programs(?:\/.*)?$/,
  /^\/pricing(?:\/.*)?$/,
  /^\/company(?:\/.*)?$/,
  /^\/news(?:\/.*)?$/,
  /^\/docs(?:\/.*)?$/,
  /^\/login(?:\/.*)?$/,
  /^\/legal(?:\/.*)?$/,
  /^\/changelog(?:\/.*)?$/,
  /^\/api\/webhooks\/.*$/,
  /^\/api\/og(?:\/.*)?$/,
  /^\/courses(?:\/.*)?$/,
];

const ADMIN_ROUTE_PATTERNS: RegExp[] = [/^\/admin(?:\/.*)?$/, /^\/api\/admin(?:\/.*)?$/];
const ADMIN_ALLOWED_ROLES = new Set(['ADMIN', 'STAFF']);
const REQUIRE_ADMIN_2FA = process.env.REQUIRE_ADMIN_2FA === 'true';

const experiments: Record<string, string[]> = {
  exp_hero_headline: ['A', 'B'],
  exp_hero_primary_cta: ['A', 'B'],
};

function matches(patterns: RegExp[], pathname: string) {
  return patterns.some((pattern) => pattern.test(pathname));
}

function applyExperiments(req: NextRequest, res: NextResponse) {
  Object.entries(experiments).forEach(([key, variants]) => {
    const existing = req.cookies.get(key)?.value;
    if (!existing || !variants.includes(existing)) {
      const variant = variants[Math.floor(Math.random() * variants.length)];
      res.cookies.set(key, variant, {
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 180, // 180 days
      });
    }
  });

  return res;
}

function redirectToLogin(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL('/login', req.url);
  loginUrl.searchParams.set('redirectTo', `${req.nextUrl.pathname}${req.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  if (!matches(PUBLIC_ROUTE_PATTERNS, pathname)) {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers,
      });

      if (!session) {
        return redirectToLogin(req);
      }

      const appUser = await ensureUserRecord(session.user.id);
      const userRole = appUser.role;
      const hasTwoFactor = Boolean((session.user as any)?.twoFactorEnabled);

      if (matches(ADMIN_ROUTE_PATTERNS, pathname)) {
        if (!ADMIN_ALLOWED_ROLES.has(userRole)) {
          if (pathname.startsWith('/api')) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
          }

          const redirectUrl = new URL('/dashboard', req.url);
          return NextResponse.redirect(redirectUrl);
        }

        if (REQUIRE_ADMIN_2FA && !hasTwoFactor && !pathname.startsWith('/settings/security')) {
          const setupUrl = new URL('/settings/security', req.url);
          setupUrl.searchParams.set('requireTwoFactor', '1');
          return NextResponse.redirect(setupUrl);
        }
      }
    } catch (error) {
      console.error('Better Auth middleware error', error);
      return redirectToLogin(req);
    }
  }

  return applyExperiments(req, res);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
