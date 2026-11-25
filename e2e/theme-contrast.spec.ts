import { expect, test, type Locator } from '@playwright/test';

function textContrast(locator: Locator) {
  return locator.evaluate(async (element) => {
    await Promise.all(element.getAnimations().map(animation => animation.finished));
    const { color, backgroundColor } = getComputedStyle(element);
    const ctx = document.createElement('canvas').getContext('2d')!;
    function luminance(paint: string) {
      ctx.fillStyle = paint;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data, (byte) => {
        const c = byte / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    const bg = luminance(backgroundColor);
    const fg = luminance(color);
    return (Math.max(bg, fg) + 0.05) / (Math.min(bg, fg) + 0.05);
  });
}

for (const theme of ['light', 'dark'] as const) {
  test(`primary buttons and muted tabs have readable text in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto('/example/tabs/demo');
    await expect(page.locator('body')).toHaveCSS('color-scheme', theme);
    const button = page.getByRole('tabpanel').getByRole('button');
    expect(await textContrast(button), 'primary button').toBeGreaterThanOrEqual(4.5);
    expect(await textContrast(page.getByRole('tablist')), 'muted tabs').toBeGreaterThanOrEqual(4.5);
  });

  test(`destructive toast is visible and readable in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto('/example/toast/destructive');
    await expect(page.locator('body')).toHaveCSS('color-scheme', theme);
    await page.getByRole('button', { name: 'Show Toast' }).press('Enter');
    const toast = page.locator('[data-slot="toast"]');
    await expect(toast).toBeVisible();
    expect(await textContrast(toast)).toBeGreaterThanOrEqual(4.5);
  });
}
