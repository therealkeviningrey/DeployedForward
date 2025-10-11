import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// If Clerk is not configured, bypass middleware entirely
if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
  // Export a no-op middleware for builds without Clerk
  export default function middleware() {
    return NextResponse.next();
  }

  export const config = {
    matcher: [],
  };
} else {
  // Full Clerk middleware when configured
  const isPublicRoute = createRouteMatcher([
    '/',
    '/product(.*)',
    '/programs(.*)',
    '/pricing(.*)',
    '/company(.*)',
    '/news(.*)',
    '/docs(.*)',
    '/login(.*)',
    '/legal(.*)',
    '/changelog(.*)',
    '/api/webhooks/(.*)',
    '/api/og(.*)',
  ]);

  const isAdminRoute = createRouteMatcher(['/admin(.*)']);

  export default clerkMiddleware((auth, req) => {
    // Protect all routes except public ones
    if (!isPublicRoute(req)) {
      auth().protect();
    }

    // Admin routes require admin role
    if (isAdminRoute(req)) {
      auth().protect((has) => {
        return has({ role: 'org:admin' }) || has({ role: 'admin' });
      });
    }
  });

  export const config = {
    matcher: [
      // Skip Next.js internals and all static files
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  };
}
