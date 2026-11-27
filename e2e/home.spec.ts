import { expect, test } from '@playwright/test';

test.use({ locale: 'en-US' });

test('protects dashboard routes through sign-in, reload and sign-out', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('isAuth', 'true'));
  for (const path of ['/', '/dashboard']) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Website traffic' })).toHaveCount(0);
  }

  const submit = page.getByRole('button', { name: 'Sign In' });
  await page.getByLabel('Email', { exact: true }).fill('other@example.com');
  await submit.click();
  await expect(page.getByRole('alert')).toBeVisible();
  await page.getByLabel('Email', { exact: true }).fill('demo@example.com');
  await page.getByLabel('Password', { exact: true }).fill('incorrect');
  await submit.click();
  await expect(page.getByRole('alert')).toBeVisible();
  await page.getByLabel('Password', { exact: true }).fill('traffic-demo');
  await submit.press('Enter');
  await expect(page).toHaveURL(/\/dashboard$/);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Website traffic' })).toBeVisible();
  await page.goto('/login');
  await expect(page).toHaveURL(/\/dashboard$/);
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await expect(page).toHaveURL(/\/login$/);
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Website traffic' })).toHaveCount(0);
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login$/);
});

for (const width of [360, 1280]) {
  test(`renders both reporting periods at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 760 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In' }).click();
    const metrics = page.locator('.traffic-metrics dd');
    const devices = page.locator('.traffic-devices dd');
    const rows = page.getByRole('table', { name: 'Daily breakdown' }).locator('tbody tr');
    await expect(metrics.first()).toHaveText('10,489');
    await expect(rows).toHaveCount(7);
    await expect(rows.first().locator('time')).toHaveAttribute('datetime', '2026-09-30');
    await expect(metrics.nth(1)).toHaveText('1,498');
    await expect(devices.first()).toContainText('6,192');
    await expect(devices.last()).toContainText('4,297');

    const panels = page.locator('.traffic-panel');
    await expect(panels.locator('svg.recharts-surface')).toHaveCount(2);
    const [trend, mix] = await Promise.all([panels.first().boundingBox(), panels.last().boundingBox()]);
    if (width < 900) expect(mix!.y).toBeGreaterThanOrEqual(trend!.y + trend!.height);
    else expect(mix!.x).toBeGreaterThanOrEqual(trend!.x + trend!.width);

    await page.getByRole('button', { name: '30 days' }).click();
    await expect(metrics.first()).toHaveText('36,639');
    await expect(rows).toHaveCount(30);
    await page.getByRole('link', { name: 'Daily breakdown' }).click();
    await expect(page).toHaveURL(/#daily$/);
    await expect(rows.last().locator('time')).toHaveAttribute('datetime', '2026-09-01');
    await expect(metrics.nth(1)).toHaveText('1,221');
    await expect(metrics.last()).toContainText('1,790');
    await expect(devices.first()).toContainText('21,532');
    await expect(devices.last()).toContainText('15,107');
    await page.getByRole('button', { name: '7 days' }).click();
    await expect(metrics.first()).toHaveText('10,489');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test('pending values, charts and table reserve the same space as the report', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route(/\/src\/data\/traffic\.ts(?:\?|$)/, async route => {
    await pending;
    await route.continue();
  });
  await page.goto('/login');
  await page.getByRole('button', { name: 'Sign In' }).click();
  const sizes = () => page.locator('.traffic-metrics, .traffic-trend, .traffic-donut, .report-ledger table')
    .evaluateAll(items => items.map(item => item.getBoundingClientRect().height));
  let before: number[];
  try {
    await expect(page.locator('.report-trend-skeleton')).toBeVisible();
    await expect(page.locator('.report-ring-skeleton')).toBeVisible();
    await expect(page.locator('.report-ledger tbody tr[aria-hidden=true]')).toHaveCount(7);
    before = await sizes();
  } finally {
    release();
  }
  await expect(page.locator('.traffic-metrics dd').first()).toHaveText('10,489');
  await expect(page.locator('.report-ring-skeleton')).toHaveCount(0);
  const after = await sizes();
  expect(after).toHaveLength(4);
  after.forEach((height, index) => expect(Math.abs(height - before[index])).toBeLessThanOrEqual(1));
});

test('retired example URLs show the translated 404 page', async ({ page }) => {
  for (const path of ['/example', '/example/tabs/demo', '/mypage']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await expect(page.locator('a[href^="/example"]')).toHaveCount(0);
  }
  await page.getByRole('button', { name: 'Change language' }).click();
  await expect(page.getByRole('heading', { name: '페이지를 찾을 수 없습니다' })).toBeVisible();
  await page.getByRole('link', { name: '대시보드로 이동' }).click();
  await expect(page).toHaveURL(/\/login$/);
});

test('loads dictionaries when their pages open', async ({ page }) => {
  const files = new Set<string>();
  page.on('request', req => {
    const path = new URL(req.url()).pathname;
    if (path.startsWith('/locales/')) files.add(path);
  });
  await page.goto('/dashboard');
  const submit = page.getByRole('button', { name: 'Sign In' });
  await expect(submit).toBeVisible();
  expect([...files].sort()).toEqual(['/locales/en/common.yml', '/locales/en/login.yml']);
  await submit.click();
  await expect(page.getByRole('heading', { name: 'Website traffic' })).toBeVisible();
  expect(files.has('/locales/en/dashboard.yml')).toBe(true);
  expect(files.has('/locales/en/not-found.yml')).toBe(false);

  files.clear();
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Website traffic' })).toBeVisible();
  expect(files.has('/locales/en/login.yml')).toBe(false);
});

test('keeps the selected language and theme after reloading the dashboard', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/login');
  await page.getByRole('button', { name: 'Change language' }).click();
  await page.getByRole('button', { name: '테마 전환' }).click();
  await page.getByRole('button', { name: '로그인' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await page.reload();
  await expect(page.getByRole('heading', { name: '웹 방문 현황' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
  await expect(page.locator('body')).toHaveCSS('color-scheme', 'dark');
});
