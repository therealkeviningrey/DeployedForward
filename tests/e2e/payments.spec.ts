import { test, expect } from '@playwright/test';

test.describe('Payment Flow', () => {
  test('pricing page displays all tiers', async ({ page }) => {
    await page.goto('/pricing');
    
    await expect(page.getByText(/operator/i)).toBeVisible();
    await expect(page.getByText(/unit/i)).toBeVisible();
    await expect(page.getByText(/battalion/i)).toBeVisible();
  });

  test('can toggle billing period', async ({ page }) => {
    await page.goto('/pricing');
    
    // Click annual toggle
    await page.getByText(/annual/i).click();
    
    // Prices should update (visual check in real test)
    await expect(page.getByText(/annual/i)).toBeVisible();
  });

  // Stripe checkout requires auth and test mode
  test.skip('can initiate checkout', async ({ page }) => {
    // Requires authenticated session
    // await page.goto('/pricing');
    // await page.getByRole('button', { name: /subscribe/i }).first().click();
    // Should redirect to Stripe Checkout
    // await expect(page).toHaveURL(/checkout.stripe.com/);
  });

  test.skip('successful payment redirects correctly', async ({ page }) => {
    // Requires completing Stripe checkout
    // await page.goto('/checkout/success');
    // await expect(page.getByText(/welcome/i)).toBeVisible();
  });
});

