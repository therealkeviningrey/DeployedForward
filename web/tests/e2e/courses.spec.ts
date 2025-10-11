import { test, expect } from '@playwright/test';

test.describe('Course Flow', () => {
  test('course catalog is accessible', async ({ page }) => {
    await page.goto('/courses');
    await expect(page).toHaveTitle(/courses/i);
  });

  test('can view course details', async ({ page }) => {
    await page.goto('/courses');
    
    // If courses exist, click on first one
    const firstCourse = page.locator('.card').first();
    const hasCourses = await firstCourse.count() > 0;
    
    if (hasCourses) {
      await firstCourse.click();
      await expect(page).toHaveURL(/\/courses\/[a-z0-9-]+/);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  });

  // Tests requiring authentication
  test.skip('enrolled users can access lessons', async ({ page }) => {
    // Requires authenticated session
    // await page.goto('/courses/ai-workflow-fundamentals/lessons/welcome-to-deployed-forward');
    // await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
  });

  test.skip('can mark lesson as complete', async ({ page }) => {
    // Requires authenticated session
    // await page.goto('/courses/some-course/lessons/some-lesson');
    // await page.getByRole('button', { name: /mark as complete/i }).click();
    // await expect(page.getByText(/completed/i)).toBeVisible();
  });

  test.skip('progress shows in dashboard', async ({ page }) => {
    // Requires authenticated session and enrollment
    // await page.goto('/dashboard');
    // await expect(page.getByText(/progress/i)).toBeVisible();
  });
});

