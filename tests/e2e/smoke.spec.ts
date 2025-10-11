import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Deployed Forward/);
    await expect(page.getByRole('heading', { name: /train where the future is operational/i })).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');
    
    // Test main navigation
    await page.getByRole('link', { name: /product/i }).click();
    await expect(page).toHaveURL(/\/product/);
    
    await page.getByRole('link', { name: /pricing/i }).click();
    await expect(page).toHaveURL(/\/pricing/);
    
    await page.getByRole('link', { name: /company/i }).click();
    await expect(page).toHaveURL(/\/company/);
  });

  test('404 page works', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.getByRole('heading', { name: /404/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /back to home/i })).toBeVisible();
  });

  test('sitemap is accessible', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('xml');
  });

  test('robots.txt is accessible', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
  });
});

test.describe('Marketing Pages', () => {
  const pages = [
    { url: '/', title: /deployed forward/i },
    { url: '/product', title: /product/i },
    { url: '/programs', title: /programs/i },
    { url: '/pricing', title: /pricing/i },
    { url: '/company', title: /company/i },
    { url: '/news', title: /news/i },
    { url: '/docs', title: /docs/i },
    { url: '/legal/privacy', title: /privacy/i },
    { url: '/legal/terms', title: /terms/i },
    { url: '/changelog', title: /changelog/i },
  ];

  for (const { url, title } of pages) {
    test(`${url} loads without errors`, async ({ page }) => {
      await page.goto(url);
      await expect(page).toHaveTitle(title);
      
      // Check for JavaScript errors
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.waitForLoadState('networkidle');
      expect(errors.length).toBe(0);
    });
  }
});

test.describe('Accessibility', () => {
  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    const firstFocusable = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocusable).toBeTruthy();
    
    // Check focus visible styles are applied
    await page.keyboard.press('Tab');
    const hasFocusVisible = await page.evaluate(() => {
      return window.getComputedStyle(document.activeElement!).outlineColor !== '';
    });
    expect(hasFocusVisible).toBe(true);
  });

  test('heading hierarchy is correct', async ({ page }) => {
    await page.goto('/');
    
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Only one H1 per page
    
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0); // Should have section headings
  });
});

