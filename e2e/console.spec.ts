import { expect, test } from '@playwright/test';

test.use({ locale: 'en-US' });

test('collapsed navigation, a paid order, and sales totals stay in sync', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/manage/sales/summary');
  await expect(page).toHaveURL(/\/login$/);
  await page.getByRole('button', { name: 'Sign In' }).click();
  const rail = page.locator('.console-rail');
  await rail.locator('.rail-toggle > summary').click();
  await page.reload();
  await expect(rail.locator('.rail-toggle')).not.toHaveAttribute('open', '');
  await rail.getByRole('link', { name: 'Sales management' }).click();
  await expect(page.getByRole('heading', { name: 'Orders' })).toBeVisible();
  await page.getByRole('button', { name: 'Mark as paid · O-208' }).click();
  await expect(page.getByRole('row').filter({ hasText: 'O-208' })).toContainText('Paid');
  await rail.getByRole('link', { name: 'Sales summary' }).click();
  await expect(page.locator('.console-counts dd')).toHaveText(['₩294,000', '6']);
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('.console-queue strong')).toHaveText(['2', '1', '1']);
});

test('the mobile drawer opens, discloses children, and closes after navigation', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 760 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Open menu' }).click();
  const drawer = page.locator('#console-drawer');
  const group = drawer.locator('summary').filter({ hasText: 'Site management' });
  const settings = drawer.getByRole('link', { name: 'Site settings' });
  await group.click();
  await expect(settings).toBeHidden();
  await group.click();
  await settings.click();
  await expect(drawer).toBeHidden();
  await page.getByLabel('Site display name').fill('Sample storefront');
  await page.getByRole('button', { name: 'Save settings' }).click();
  await page.reload();
  await expect(page.getByLabel('Site display name')).toHaveValue('Sample storefront');
});
