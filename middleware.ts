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
  '/courses(.*)', // Allow courses page to be public
]);

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, req) => {
  // Allow access to public routes
  if (isPublicRoute(req)) {
    return;
  }

  // Protect all other routes (dashboard, enrolled content, etc.)
  try {
    auth().protect();
  } catch (error) {
    // If Clerk is not configured, allow in development
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    throw error;
  }

  // Admin routes require admin role
  if (isAdminRoute(req)) {
    try {
      auth().protect((has) => {
        return has({ role: 'org:admin' }) || has({ role: 'admin' });
      });
    } catch (error) {
      // Ignore in development
      if (process.env.NODE_ENV === 'development') {
        return;
      }
      throw error;
    }
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
