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
  test(`all ${theme} theme colors are neutral grays`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto('/');
    await expect(page.locator('body')).toHaveCSS('color-scheme', theme);
    const invalid = await page.evaluate(() => {
      const styles = getComputedStyle(document.body);
      const ctx = document.createElement('canvas').getContext('2d')!;
      const roles = [
        'background', 'foreground', 'border', 'input', 'ring',
        'sidebar-background', 'sidebar-foreground', 'sidebar-border', 'sidebar-ring',
        ...['primary', 'secondary', 'muted', 'accent', 'destructive', 'card', 'popover',
          'sidebar-primary', 'sidebar-accent'].flatMap(role => [role, `${role}-foreground`]),
      ];
      return roles.filter(role => {
        const paint = styles.getPropertyValue(`--${role}`).trim();
        if (!CSS.supports('color', paint)) return true;
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = paint;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        return a !== 255 || r !== g || g !== b;
      });
    });
    expect(invalid).toEqual([]);
  });

  test(`sign-in, period selection and traffic metrics have readable text in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto('/login');
    await expect(page.locator('body')).toHaveCSS('color-scheme', theme);
    const button = page.locator('form button[type="submit"]');
    expect(await textContrast(button), 'primary button').toBeGreaterThanOrEqual(4.5);
    await button.click();
    expect(await textContrast(page.locator('button[aria-pressed="true"]')), 'selected period').toBeGreaterThanOrEqual(4.5);
    expect(await textContrast(page.locator('.traffic-metrics')), 'traffic metrics').toBeGreaterThanOrEqual(4.5);
  });
}
