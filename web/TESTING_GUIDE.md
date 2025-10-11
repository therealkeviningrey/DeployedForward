# Testing Guide - Deployed Forward

## Overview

This guide covers testing the Deployed Forward platform in local, preview, and production environments.

---

## Test Types

### 1. Unit Tests (Future)
Test individual functions and components in isolation.

**Not yet implemented** - Add with Jest/Vitest if needed.

### 2. E2E Tests (Playwright)
Test complete user flows across the application.

**Status**: Basic suite provided, expand as needed.

### 3. Manual Testing
Critical user flows tested by humans.

**Status**: Checklists provided below.

### 4. Performance Tests
Lighthouse audits for web vitals.

**Status**: Can run anytime with Lighthouse CLI.

---

## Running Tests

### Playwright E2E Tests

**Install Playwright:**
```bash
cd /Users/keviningrey/CursorProjects/DeployedForward/web
npx playwright install
```

**Run all tests:**
```bash
npm run test:e2e
```

**Run specific test file:**
```bash
npx playwright test tests/e2e/smoke.spec.ts
```

**Run with UI:**
```bash
npx playwright test --ui
```

**Run on specific browser:**
```bash
npx playwright test --project=chromium
```

**Debug tests:**
```bash
npx playwright test --debug
```

---

## Manual Testing Checklist

### Local Environment

#### Prerequisites
- [ ] Database seeded with demo data
- [ ] All env vars configured
- [ ] Stripe CLI running (webhook forwarding)
- [ ] Dev server running (`npm run dev`)

#### Core Functionality
- [ ] Homepage loads at http://localhost:3000
- [ ] All navigation links work
- [ ] Logo links to homepage
- [ ] Footer links work
- [ ] Marketing pages load without errors

#### Authentication (Requires Clerk)
- [ ] Can access login page
- [ ] Sign-up flow works
- [ ] Sign-in flow works
- [ ] Dashboard accessible after login
- [ ] User created in database
- [ ] Sign-out works
- [ ] Protected routes redirect when logged out

#### Course Platform
- [ ] Course catalog shows courses from database
- [ ] Can view course details
- [ ] Enrollment button shows
- [ ] (Logged in) Can enroll in course
- [ ] Enrollment email received
- [ ] Can view enrolled course lessons
- [ ] MDX content renders correctly
- [ ] Can mark lesson complete
- [ ] Progress updates in database
- [ ] Dashboard shows progress
- [ ] Completing all lessons generates certificate
- [ ] Certificate email received
- [ ] Can download certificate (OG image)

#### Payments (Requires Stripe)
- [ ] Pricing page shows all tiers
- [ ] Can toggle monthly/annual
- [ ] Subscribe button works
- [ ] Redirects to Stripe Checkout
- [ ] Test card works (4242 4242 4242 4242)
- [ ] Payment succeeds
- [ ] Webhook received (check Stripe CLI output)
- [ ] Subscription created in database
- [ ] Redirects to success page
- [ ] Subscription shows in dashboard
- [ ] Billing portal accessible
- [ ] Can view invoices in portal

#### Emails (Requires Resend)
- [ ] Welcome email on sign-up
- [ ] Enrollment email on course enroll
- [ ] Certificate email on completion
- [ ] Emails properly formatted (check inbox)
- [ ] Links in emails work

#### Admin
- [ ] Can access `/admin` (when logged in)
- [ ] Dashboard shows stats
- [ ] Can view course list
- [ ] Can create new course
- [ ] Course appears in list
- [ ] Can view enrollments

---

### Preview Environment (Vercel)

Use the same checklist as Local, but on your preview URL.

**Additional checks:**
- [ ] Environment variables loaded correctly
- [ ] Database connection works
- [ ] Stripe webhook endpoint reachable
- [ ] No console errors in browser
- [ ] All assets load (check Network tab)
- [ ] HTTPS certificate valid
- [ ] Custom domain works (if configured)

**Performance:**
- [ ] Run Lighthouse audit
- [ ] Performance score ≥ 90
- [ ] Accessibility score ≥ 90
- [ ] Best Practices score ≥ 90
- [ ] SEO score ≥ 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

**SEO:**
- [ ] View page source - meta tags present
- [ ] OG tags have correct content
- [ ] Twitter card tags present
- [ ] JSON-LD present in source
- [ ] Sitemap.xml accessible
- [ ] Robots.txt accessible
- [ ] Paste URL in Slack/Discord - preview shows

**Monitoring:**
- [ ] Check Vercel function logs
- [ ] Check Sentry for errors
- [ ] Verify analytics tracking
- [ ] Test cron job execution

---

### Production Environment

**Critical Path Testing:**

1. **Sign Up Flow** (5 min)
   - New user signs up
   - Receives welcome email
   - Can access dashboard

2. **Course Enrollment** (5 min)
   - Browse courses
   - Enroll in course
   - Receive enrollment email
   - Can access lessons

3. **Learning Flow** (10 min)
   - View lesson
   - Complete lesson
   - Progress updates
   - Complete all lessons
   - Certificate generated
   - Certificate email received

4. **Payment Flow** (5 min)
   - Go to pricing
   - Select plan
   - Complete checkout
   - Subscription active
   - Can access billing portal

5. **Admin Flow** (5 min)
   - Access admin dashboard
   - View stats
   - Create test course
   - Verify course appears

**Regression Testing:**
- [ ] All smoke tests pass
- [ ] All auth flows work
- [ ] All payment flows work
- [ ] All email notifications send
- [ ] Monitoring shows no errors

**Load Testing:**
- [ ] Site handles concurrent users
- [ ] Database queries performant
- [ ] No timeout errors
- [ ] Cron jobs execute on schedule

---

## Lighthouse Audit Guide

### Run Locally

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view

# Run for specific page
lighthouse http://localhost:3000/courses --view

# Export JSON
lighthouse http://localhost:3000 --output json --output-path ./lighthouse-report.json
```

### Target Scores (Minimum)

- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 95
- **SEO**: ≥ 95

### Common Issues & Fixes

**Performance:**
- Images not optimized → use Next.js Image component
- Large JavaScript bundles → code split
- Render-blocking resources → preload fonts
- Long server response → optimize API calls

**Accessibility:**
- Missing alt text → add to all images
- Low contrast → check color combinations
- Missing labels → add to form inputs
- Keyboard navigation → test all interactive elements

**SEO:**
- Missing meta description → add to page metadata
- Links not crawlable → ensure proper hrefs
- Missing structured data → verify JSON-LD

---

## Test Data

### Test Users

Create test users in Clerk:
- `operator@test.com` - Operator tier subscriber
- `unit@test.com` - Unit tier subscriber  
- `admin@test.com` - Admin role

### Test Courses

Seed data includes:
- "AI Workflow Fundamentals" (Operator level)

Create additional courses via:
```bash
npm run db:seed
```

Or via Prisma Studio:
```bash
npm run db:studio
```

### Test Cards (Stripe)

**Success:**
- 4242 4242 4242 4242 (Visa)
- 5555 5555 5555 4444 (Mastercard)

**Decline:**
- 4000 0000 0000 0002

**3D Secure:**
- 4000 0027 6000 3184

---

## Continuous Testing

### On Every Commit
- [ ] Build succeeds locally
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Tests pass

### On Every Deploy (Vercel)
- [ ] Build succeeds
- [ ] Preview URL works
- [ ] Smoke tests pass
- [ ] No console errors

### Weekly
- [ ] Run full E2E suite
- [ ] Lighthouse audits
- [ ] Review error logs
- [ ] Check email deliverability

### Monthly
- [ ] Security audit
- [ ] Dependency updates
- [ ] Performance review
- [ ] User feedback review

---

## Debugging Failed Tests

### Playwright Failures

**View last run:**
```bash
npx playwright show-report
```

**Screenshot on failure:**
Tests automatically capture screenshots. Find in `test-results/`.

**Video recording:**
Enable in `playwright.config.ts`:
```ts
use: {
  video: 'on-first-retry',
}
```

**Trace viewer:**
```bash
npx playwright show-trace test-results/trace.zip
```

### Common Issues

**Timeout errors:**
- Increase timeout in test
- Check network requests
- Verify server is running

**Element not found:**
- Check selector
- Wait for element to appear
- Verify page loaded correctly

**Authentication failures:**
- Check Clerk configuration
- Verify API keys
- Review Clerk logs

---

## Test Coverage Goals

### Current Coverage
- ✅ Smoke tests (page loads, navigation)
- ✅ Accessibility basics (keyboard, headings)
- ⏳ Authentication (requires Clerk setup)
- ⏳ Course flow (requires DB + Auth)
- ⏳ Payment flow (requires Stripe setup)

### Target Coverage
- All critical user paths
- Error states
- Edge cases
- Cross-browser compatibility
- Mobile responsiveness

---

## CI/CD Integration

### GitHub Actions (Future)

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

### Vercel Integration
- Tests run automatically on deploy
- Failed builds block deployment
- Preview comments show test results

---

## Performance Budgets

Set alerts if:
- LCP > 2.5s
- FID > 100ms
- CLS > 0.1
- Bundle size > 500KB (initial)
- API response > 500ms

---

## Monitoring in Production

### Real User Monitoring
- Vercel Analytics tracks actual performance
- Sentry captures errors
- Monitor conversion funnel

### Synthetic Monitoring
- Schedule Lighthouse audits weekly
- Run E2E tests daily
- Check uptime

---

## Test Scripts (Add to package.json)

```json
"scripts": {
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:debug": "playwright test --debug",
  "test:lighthouse": "lighthouse http://localhost:3000 --view",
  "test:a11y": "playwright test tests/e2e/accessibility.spec.ts"
}
```

---

## Success Criteria

### Before Launch
- [x] All marketing pages load
- [x] Navigation works
- [x] SEO tags present
- [x] Accessibility compliant
- [ ] Auth flow works (needs Clerk)
- [ ] Course flow works (needs DB)
- [ ] Payment flow works (needs Stripe)
- [ ] Emails deliver (needs Resend)
- [ ] Lighthouse scores ≥ 90
- [ ] No critical Sentry errors

### Post-Launch
- [ ] Real users can sign up
- [ ] Real users can enroll
- [ ] Real users can complete courses
- [ ] Real payments process
- [ ] Emails deliver consistently
- [ ] Performance remains high
- [ ] Error rate < 1%

---

**Status**: Test infrastructure complete ✅
**Next**: Configure services and run tests
**Estimated**: 1-2 hours to complete all tests

---

Last Updated: $(date)

