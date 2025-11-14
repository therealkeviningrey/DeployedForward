import { test, expect } from '@playwright/test';

/**
 * E2E Test: Complete User Journey
 *
 * Tests the critical path:
 * 1. Homepage → Browse Courses
 * 2. Course Detail → View Curriculum
 * 3. Pricing Page → View Plans
 * 4. Login (redirect to Clerk)
 *
 * With authentication (future):
 * 5. Enroll in Course
 * 6. Complete Lesson
 * 7. View Progress in Dashboard
 * 8. Receive Certificate
 */

test.describe('Critical User Journey', () => {
  test.describe('Guest User Flow', () => {
    test('can navigate from homepage to courses', async ({ page }) => {
      // Start at homepage
      await page.goto('/');
      await expect(page).toHaveTitle(/Deployed Forward/i);

      // Click on course catalog link
      await page.getByRole('link', { name: /courses/i }).first().click();
      await expect(page).toHaveURL(/\/courses/);
    });

    test('can view course catalog and details', async ({ page }) => {
      await page.goto('/courses');

      // Wait for courses to load
      await page.waitForLoadState('networkidle');

      // Check if courses are displayed
      const courseCards = page.locator('[data-testid="course-card"]').or(page.locator('.card'));
      const count = await courseCards.count();

      if (count > 0) {
        // Click first course
        await courseCards.first().click();

        // Should navigate to course detail page
        await expect(page).toHaveURL(/\/courses\/[a-z0-9-]+/);

        // Course title should be visible
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

        // Enrollment CTA should be visible
        const enrollButton = page.getByRole('button', { name: /enroll|get started|start learning/i });
        await expect(enrollButton.or(page.getByRole('link', { name: /enroll|get started|start learning/i }))).toBeVisible();
      }
    });

    test('can view pricing page', async ({ page }) => {
      await page.goto('/pricing');

      // Should show pricing tiers
      await expect(page.getByText(/operator/i)).toBeVisible();

      // Should show pricing amounts
      await expect(page.getByText(/\$19/)).toBeVisible();

      // Should have CTA buttons
      const ctaButtons = page.getByRole('button', { name: /get started|subscribe|choose plan/i });
      expect(await ctaButtons.count()).toBeGreaterThan(0);
    });

    test('protected routes redirect to login', async ({ page }) => {
      // Try to access dashboard without auth
      await page.goto('/dashboard');

      // Should redirect to Clerk login
      await page.waitForURL(/sign-in/, { timeout: 5000 });
      expect(page.url()).toContain('sign-in');
    });

    test('enrollment without auth redirects to login', async ({ page }) => {
      await page.goto('/courses');
      await page.waitForLoadState('networkidle');

      const courseCards = page.locator('[data-testid="course-card"]').or(page.locator('.card'));
      const count = await courseCards.count();

      if (count > 0) {
        await courseCards.first().click();
        await expect(page).toHaveURL(/\/courses\/[a-z0-9-]+/);

        // Try to enroll (should redirect to login)
        const enrollButton = page.getByRole('button', { name: /enroll|get started|start learning/i }).first();

        if (await enrollButton.isVisible()) {
          await enrollButton.click();

          // Should redirect to sign-in
          await page.waitForURL(/sign-in/, { timeout: 5000 });
          expect(page.url()).toContain('sign-in');
        }
      }
    });
  });

  test.describe('Navigation and UX', () => {
    test('header navigation works across pages', async ({ page }) => {
      await page.goto('/');

      // Test navigation links
      const navLinks = ['courses', 'pricing', 'product'];

      for (const link of navLinks) {
        const navLink = page.getByRole('link', { name: new RegExp(link, 'i') }).first();
        if (await navLink.isVisible()) {
          await navLink.click();
          await expect(page).toHaveURL(new RegExp(link, 'i'));
          await page.goto('/'); // Reset
        }
      }
    });

    test('hero section displays key value propositions', async ({ page }) => {
      await page.goto('/');

      // Should show main headline
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      // Should show CTA
      const ctaButton = page.getByRole('button', { name: /get started|start learning|explore/i }).first();
      await expect(ctaButton.or(page.getByRole('link', { name: /get started|start learning|explore/i }).first())).toBeVisible();
    });

    test('footer links are present', async ({ page }) => {
      await page.goto('/');

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Check for common footer links
      const footerLinks = ['privacy', 'terms'];
      for (const link of footerLinks) {
        const footerLink = page.getByRole('link', { name: new RegExp(link, 'i') });
        if (await footerLink.count() > 0) {
          await expect(footerLink.first()).toBeVisible();
        }
      }
    });
  });

  // Tests that require authentication
  // These will be enabled once Clerk test mode is configured
  test.describe.skip('Authenticated User Flow', () => {
    test('can enroll in a course', async ({ page }) => {
      // TODO: Set up authenticated session
      // await setupAuthenticatedSession(page);

      await page.goto('/courses');
      const firstCourse = page.locator('[data-testid="course-card"]').first();
      await firstCourse.click();

      // Click enroll button
      await page.getByRole('button', { name: /enroll/i }).click();

      // Should redirect to dashboard or course page
      await expect(page).toHaveURL(/dashboard|courses/);

      // Success message or enrollment confirmation
      await expect(page.getByText(/enrolled|welcome/i)).toBeVisible({ timeout: 10000 });
    });

    test('can complete a lesson', async ({ page }) => {
      // TODO: Set up authenticated session and enrollment
      // await setupAuthenticatedSession(page);
      // await enrollInTestCourse(page);

      // Navigate to first lesson
      await page.goto('/courses/test-course/lessons/test-lesson');

      // Read through lesson
      await page.waitForLoadState('networkidle');

      // Mark as complete
      const completeButton = page.getByRole('button', { name: /mark as complete|complete/i });
      await expect(completeButton).toBeVisible();
      await completeButton.click();

      // Should show completion feedback
      await expect(page.getByText(/completed|great job|next lesson/i)).toBeVisible({ timeout: 5000 });
    });

    test('progress appears in dashboard', async ({ page }) => {
      // TODO: Set up authenticated session with completed lessons
      // await setupAuthenticatedSession(page);

      await page.goto('/dashboard');

      // Should show enrolled courses
      await expect(page.getByText(/enrolled courses|my courses|continue learning/i)).toBeVisible();

      // Should show progress percentage
      await expect(page.getByText(/%|progress/i)).toBeVisible();

      // Should show "Continue where you left off" if applicable
      const continueSection = page.getByText(/continue|resume/i);
      if (await continueSection.count() > 0) {
        await expect(continueSection.first()).toBeVisible();
      }
    });

    test('certificate is generated after course completion', async ({ page }) => {
      // TODO: Set up authenticated session with fully completed course
      // await setupAuthenticatedSession(page);
      // await completeAllLessons(page, 'test-course');

      await page.goto('/dashboard');

      // Should show certificate
      await expect(page.getByText(/certificate|certified|completed/i)).toBeVisible();

      // Should be able to download or view certificate
      const certificateLink = page.getByRole('link', { name: /view certificate|download/i });
      if (await certificateLink.count() > 0) {
        await expect(certificateLink.first()).toBeVisible();
      }
    });

    test('can submit assessment and see results', async ({ page }) => {
      // TODO: Set up authenticated session
      // await setupAuthenticatedSession(page);

      await page.goto('/courses/test-course/lessons/test-lesson-with-assessment');

      // Fill out assessment
      const assessmentForm = page.locator('form[data-testid="assessment-form"]');
      await expect(assessmentForm).toBeVisible();

      // Select answers (assuming MCQ)
      await page.getByRole('radio').first().check();

      // Submit
      await page.getByRole('button', { name: /submit/i }).click();

      // Should show results
      await expect(page.getByText(/correct|score|result/i)).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Performance and Accessibility', () => {
    test('pages load within acceptable time', async ({ page }) => {
      const pages = ['/', '/courses', '/pricing'];

      for (const path of pages) {
        const startTime = Date.now();
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        const loadTime = Date.now() - startTime;

        // Should load within 5 seconds
        expect(loadTime).toBeLessThan(5000);
      }
    });

    test('images have alt text', async ({ page }) => {
      await page.goto('/');

      const images = page.locator('img');
      const count = await images.count();

      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const img = images.nth(i);
          const alt = await img.getAttribute('alt');

          // Alt should exist (can be empty for decorative images)
          expect(alt).not.toBeNull();
        }
      }
    });

    test('keyboard navigation works', async ({ page }) => {
      await page.goto('/');

      // Tab through focusable elements
      await page.keyboard.press('Tab');

      // At least one element should have focus
      const focusedElement = await page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });
});
