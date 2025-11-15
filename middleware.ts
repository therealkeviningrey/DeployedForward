import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

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

interface AuthCheckResult {
  authenticated: boolean;
  role: string | null;
  twoFactorEnabled: boolean;
}

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

async function getAuthState(req: NextRequest): Promise<AuthCheckResult> {
  try {
    const endpoint = new URL('/api/internal/auth/session', req.url);
    const response = await fetch(endpoint, {
      headers: {
        cookie: req.headers.get('cookie') ?? '',
        'x-forwarded-host': req.headers.get('x-forwarded-host') ?? '',
        'x-forwarded-proto': req.headers.get('x-forwarded-proto') ?? '',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return { authenticated: false, role: null, twoFactorEnabled: false };
    }

    const data = (await response.json()) as Partial<AuthCheckResult>;
    return {
      authenticated: Boolean(data.authenticated),
      role: data.role ?? null,
      twoFactorEnabled: Boolean(data.twoFactorEnabled),
    };
  } catch (error) {
    console.error('Failed to load auth state in middleware:', error);
    return { authenticated: false, role: null, twoFactorEnabled: false };
  }
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
      const authState = await getAuthState(req);

      if (!authState.authenticated) {
        return redirectToLogin(req);
      }

      const userRole = authState.role ?? 'USER';
      const hasTwoFactor = authState.twoFactorEnabled;

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
      console.error('Middleware auth error', error);
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
