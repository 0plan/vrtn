import { test, expect } from '@playwright/test';

test('home page renders the hero heading', async ({ page }) => {
  await page.goto('/');
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();
  await expect(heading).not.toBeEmpty();
});

test('navigates from home to the examples page', async ({ page }) => {
  await page.goto('/');
  // The primary CTA is a link to /example (language-agnostic selector).
  await page.locator('a[href="/example"]').first().click();
  await expect(page).toHaveURL(/\/example$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
