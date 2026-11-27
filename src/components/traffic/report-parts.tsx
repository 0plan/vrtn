import type { ReactNode } from 'react';

export function ReportNav({ label, overview, charts, daily }: {
  label: string; overview: string; charts: string; daily: string;
}) {
  return (
    <nav className="report-nav" aria-label={label}>
      <p>{label}</p>
      <a href="#overview"><span aria-hidden="true">01</span>{overview}</a>
      <a href="#charts"><span aria-hidden="true">02</span>{charts}</a>
      <a href="#daily"><span aria-hidden="true">03</span>{daily}</a>
    </nav>
  );
}

export function ReportValue({ children }: { children?: ReactNode }) {
  return children ?? <span className="report-value-skeleton" aria-hidden="true" />;
}

type DailyRow = { date: string; mobile: number; desktop: number; visits: number };

export function DailyTable({ title, columns, daily, days, formatDate, number }: {
  title: string;
  columns: [string, string, string, string];
  daily?: DailyRow[];
  days: 7 | 30;
  formatDate: (date: string) => string;
  number: Intl.NumberFormat;
}) {
  const rows = daily ? daily.slice().reverse() : Array<undefined>(days).fill(undefined);
  return (
    <section id="daily" tabIndex={-1} className="report-ledger" aria-labelledby="daily-title">
      <h2 id="daily-title">{title}</h2>
      <table aria-labelledby="daily-title" aria-busy={!daily}>
        <thead><tr>{columns.map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row?.date ?? index} aria-hidden={row ? undefined : true}>
              <th scope="row"><ReportValue>{row && <time dateTime={row.date}>{formatDate(row.date)}</time>}</ReportValue></th>
              {(['mobile', 'desktop', 'visits'] as const).map(key => (
                <td key={key}><ReportValue>{row && number.format(row[key])}</ReportValue></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
