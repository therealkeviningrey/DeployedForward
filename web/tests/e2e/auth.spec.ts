import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('login page is accessible', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/login/i);
  });

  test('protected routes redirect to login', async ({ page }) => {
    await page.goto('/dashboard');
    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  // Note: Actual sign-up/sign-in tests require Clerk test mode
  // and proper configuration. Add these after Clerk is set up:
  
  test.skip('user can sign up', async ({ page }) => {
    await page.goto('/login');
    // Clerk UI interaction
    // await page.getByRole('button', { name: /sign up/i }).click();
    // ... fill form ...
    // ... verify redirect to dashboard ...
  });

  test.skip('user can sign in', async ({ page }) => {
    await page.goto('/login');
    // Clerk UI interaction
    // ... complete sign-in flow ...
    // ... verify redirect to dashboard ...
  });
});

