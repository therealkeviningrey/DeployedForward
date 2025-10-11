import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

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
  // In development without Clerk keys, allow all routes
  if (process.env.NODE_ENV === 'development' && !process.env.CLERK_SECRET_KEY) {
    return;
  }

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

