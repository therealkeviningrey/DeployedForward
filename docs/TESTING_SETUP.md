# Testing Infrastructure - Setup Complete

> ⚠️ References to Clerk in this document describe the previous authentication provider. With Better Auth live, follow the scripts and notes in [`docs/BETTER_AUTH_USER_MIGRATION.md`](BETTER_AUTH_USER_MIGRATION.md) when tests require auth setup.

## Overview

A comprehensive testing infrastructure has been implemented for Deployed Forward, covering unit tests, integration tests, and end-to-end (E2E) tests.

## What Was Implemented

### 1. Test Framework Setup

**Vitest** (Unit & Integration Tests)
- Configuration: `vitest.config.ts`
- Environment: jsdom for React component testing
- Coverage provider: v8
- Path aliases configured to match project structure

**Playwright** (E2E Tests)
- Configuration: `playwright.config.ts` (already existed, validated)
- Browsers: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Test directory: `tests/e2e/`
- Automatic dev server startup

**Testing Libraries**
- `@testing-library/react` - Component testing utilities
- `@testing-library/jest-dom` - DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `msw` - API mocking (Mock Service Worker)

### 2. Test Directory Structure

```
tests/
├── setup.ts                    # Global test configuration
├── helpers/                    # Test utilities
│   ├── mockClerk.ts           # Clerk auth mocking
│   └── mockStripe.ts          # Stripe service mocking
├── fixtures/                   # Test data (future)
├── unit/                       # Unit tests (future)
├── integration/                # Integration tests
│   ├── progress.test.ts       # Progress tracking & certificates
│   └── stripe-webhooks.test.ts # Subscription management
└── e2e/                        # End-to-end tests
    ├── auth.spec.ts           # Authentication flow (existing)
    ├── courses.spec.ts        # Course navigation (existing)
    ├── payments.spec.ts       # Payment flow (existing)
    ├── smoke.spec.ts          # Basic smoke tests (existing)
    └── user-journey.spec.ts   # Critical user journey (NEW)
```

### 3. NPM Scripts Added

```json
{
  "test": "vitest",                    // Run tests in watch mode
  "test:ui": "vitest --ui",            // Run with UI dashboard
  "test:run": "vitest run",            // Run once and exit
  "test:coverage": "vitest run --coverage", // With coverage report
  "test:watch": "vitest watch",        // Watch mode (explicit)
  "test:e2e": "playwright test",       // E2E tests
  "test:e2e:ui": "playwright test --ui", // E2E with UI
  "test:e2e:debug": "playwright test --debug", // E2E debug mode
  "test:all": "npm run test:run && npm run test:e2e" // Run all tests
}
```

### 4. Test Coverage

#### Integration Tests: Progress Tracking (`progress.test.ts`)

Tests the core learning flow:
- ✅ Track lesson completion progress
- ✅ Calculate course completion percentage
- ✅ Certificate issuance logic (only when 100% complete)
- ✅ Prevent duplicate certificates
- ✅ Track last viewed lesson for "Continue where you left off"

**Key Business Logic Tested:**
```typescript
// Formula: (completed lessons / total lessons) * 100
const allLessons = course.modules.flatMap(m => m.lessons);
const completedProgress = await prisma.progress.findMany({
  where: { userId, lessonId: { in: allLessons.map(l => l.id) }, completed: true }
});
const percentage = (completedProgress.length / allLessons.length) * 100;
```

#### Integration Tests: Stripe Webhooks (`stripe-webhooks.test.ts`)

Tests subscription management:
- ✅ Create subscription on checkout completion
- ✅ Map Stripe price IDs to subscription tiers (OPERATOR, UNIT, BATTALION)
- ✅ Map Stripe statuses (active, canceled, past_due, trialing)
- ✅ Update subscription on renewal
- ✅ Track `cancel_at_period_end` flag
- ✅ Mark as CANCELED on deletion (soft delete)
- ✅ Handle subscription upsert (update existing)
- ✅ Identify expired subscriptions
- ✅ Check access permissions (active or trialing = has access)

#### E2E Tests: User Journey (`user-journey.spec.ts`)

Tests critical paths:
- ✅ Homepage → Course catalog navigation
- ✅ Course detail page view
- ✅ Pricing page display
- ✅ Protected route redirects (dashboard → login)
- ✅ Enrollment without auth redirects to login
- ✅ Header navigation across pages
- ✅ Hero section and CTAs
- ✅ Footer links
- ✅ Performance (pages load < 5s)
- ✅ Accessibility (alt text, keyboard navigation)

**Skipped (Requires Clerk Test Mode):**
- 🔲 Enroll in course (authenticated)
- 🔲 Complete lesson (authenticated)
- 🔲 Progress in dashboard (authenticated)
- 🔲 Certificate generation (authenticated)
- 🔲 Assessment submission (authenticated)

### 5. Mock Helpers

#### `mockClerk.ts`
```typescript
// Mock authenticated user
mockAuth('test-user-123')

// Mock unauthenticated state
mockUnauthenticated()

// Mock current user data
mockCurrentUser({ id: 'user-123', email: 'test@example.com' })
```

#### `mockStripe.ts`
```typescript
// Mock checkout session
mockCheckoutSession({ customer: 'cus_123' })

// Mock subscription
mockSubscription({ status: 'active', tier: 'OPERATOR' })

// Mock webhook event
mockWebhookEvent('checkout.session.completed', sessionData)

// Mock Stripe client
mockStripeClient() // Returns mocked SDK methods
```

## Running Tests

### Unit & Integration Tests

```bash
# Watch mode (recommended during development)
npm test

# Run once
npm run test:run

# With coverage report
npm run test:coverage

# With UI dashboard
npm run test:ui
```

### E2E Tests

```bash
# Headless mode
npm run test:e2e

# With UI (recommended for debugging)
npm run test:e2e:ui

# Debug mode (step through tests)
npm run test:e2e:debug

# Specific test file
npx playwright test user-journey
```

### All Tests

```bash
npm run test:all
```

## Test Database Setup

**Important:** Integration tests use the actual database configured in your environment variables.

For true isolation, set up a separate test database:

```bash
# In .env.test or .env.local
TEST_DATABASE_URL=postgresql://user:pass@localhost:5432/deployed_forward_test

# Create test database
createdb deployed_forward_test

# Run migrations
DATABASE_URL=$TEST_DATABASE_URL npx prisma migrate deploy
```

The `tests/setup.ts` file will use `TEST_DATABASE_URL` if available, otherwise falls back to the default database.

## Code Coverage Goals

| Type | Current | Target |
|------|---------|--------|
| Integration Tests | ~70% | 80%+ |
| E2E Tests | ~40% (many skipped) | 80%+ |
| Overall | TBD | 80%+ |

**Priority areas for additional coverage:**
1. ✅ Progress tracking (covered)
2. ✅ Subscription management (covered)
3. 🔲 Email sending (mock Resend)
4. 🔲 Assessment grading logic
5. 🔲 Course/module/lesson CRUD
6. 🔲 User sync between Clerk and Prisma
7. 🔲 Analytics tracking functions

## Next Steps

### Phase 1 Completion Checklist

- [x] Install test dependencies
- [x] Configure Vitest
- [x] Configure Playwright
- [x] Create test helpers
- [x] Write progress tracking tests
- [x] Write Stripe webhook tests
- [x] Write critical path E2E tests
- [x] Add npm scripts
- [ ] Set up CI/CD test pipeline
- [ ] Add test database setup scripts
- [ ] Enable Clerk test mode for auth tests
- [ ] Increase coverage to 80%+

### Recommended Additions

1. **Unit Tests for Utilities**
   - `lib/analytics.ts` (track events, prevent infinite recursion)
   - `lib/email.ts` (template generation)
   - `lib/content.ts` (MDX parsing)
   - `lib/seo.ts` (metadata generation)

2. **Integration Tests**
   - Enrollment flow (API route)
   - Assessment submission and grading
   - Certificate email sending
   - User creation/sync

3. **E2E Tests with Authentication**
   - Complete user signup flow
   - Enroll in course
   - Complete lessons
   - Receive certificate
   - Access billing portal

4. **CI/CD Integration**
   ```yaml
   # .github/workflows/test.yml
   - name: Run tests
     run: |
       npm run test:run
       npm run test:e2e
   ```

## Troubleshooting

### Tests fail with "Cannot find module"
- Run `npm run db:generate` to generate Prisma client
- Ensure all path aliases in `vitest.config.ts` match `tsconfig.json`

### E2E tests fail with "Navigation timeout"
- Ensure dev server is running (`npm run dev`)
- Check `playwright.config.ts` `webServer` configuration
- Increase timeout in test: `{ timeout: 30000 }`

### Integration tests fail with database errors
- Ensure database is running
- Run migrations: `npm run db:migrate`
- Check connection string in `.env`

### "Module 'vitest' not found"
- Run `npm install`
- Restart your editor/IDE

## Documentation

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [MSW (Mock Service Worker)](https://mswjs.io/)

---

**Phase 1 Complete** ✅

Ready to move to **Phase 2: Content + Onboarding**
