import traffic from './traffic.json';

export function getTrafficReport(days: 7 | 30) {
  const daily = traffic.slice(-days).map(row => ({
    ...row,
    visits: row.mobile + row.desktop,
  }));
  const mobile = daily.reduce((sum, row) => sum + row.mobile, 0);
  const desktop = daily.reduce((sum, row) => sum + row.desktop, 0);
  const total = mobile + desktop;
  const peak = daily.reduce((best, row) => row.visits > best.visits ? row : best);

  return { daily, mobile, desktop, total, average: Math.round(total / daily.length), peak };
}
