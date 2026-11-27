import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import type { MenuPage } from './menu';
import { registerFor, siteSettings, type Filter, type Text, type Workspace } from './workspace';

export function ManagementPanel({ page, state, filter, result, t, common, save }: {
  page: MenuPage; state: Workspace; filter: Filter; result?: string;
  t: Text; common: Text; save: (data: FormData) => void | Promise<void>;
}) {
  const register = registerFor(page.key, state, filter, t);
  const site = siteSettings(state);
  const navigate = useNavigate();
  return (
    <section className="console-page" aria-labelledby="console-title">
      <h1 id="console-title">{common(page.key)}</h1>
      <p className="console-description">{t('description')}</p>
      {result === 'saved' && <p role="status" className="console-feedback">{common('saved')}</p>}
      {result === 'invalid' && <p role="alert" className="console-feedback">{common('invalid')}</p>}
      {page.key === 'settings' ? (
        <form className="console-settings" action={save}>
          <label>{t('name')}<Input name="name" required maxLength={60} defaultValue={site.name} /></label>
          <label>{t('email')}<Input type="email" name="email" required maxLength={254} defaultValue={site.email} /></label>
          <Button type="submit">{t('save')}</Button>
        </form>
      ) : (
        <>
          {register.metrics && <dl className="console-counts">{register.metrics.map(metric => (
            <div key={metric.label}><dt>{t(metric.label)}</dt><dd>{metric.value}</dd></div>
          ))}</dl>}
          {register.statuses && (
            <form className="console-filters" action={page.path} method="get" key={`${page.key}-${filter.q}-${filter.status}`}
              onSubmit={event => {
                event.preventDefault();
                const fields = new FormData(event.currentTarget);
                void navigate(`${page.path}?${new URLSearchParams({ q: String(fields.get('q')), status: String(fields.get('status')) })}`);
              }}>
              <label>{common('search')}<Input type="search" name="q" maxLength={80} defaultValue={filter.q} /></label>
              <label>{common('status')}
                <select name="status" defaultValue={filter.status}>
                  <option value="">{common('all')}</option>
                  {register.statuses.map(status => <option key={status} value={status}>{t(status)}</option>)}
                </select>
              </label>
              <Button type="submit">{common('filter')}</Button>
              {(filter.q || filter.status) && <Link to={page.path}>{common('reset')}</Link>}
            </form>
          )}
          <div className="console-list">
            <table aria-labelledby="console-title">
              <thead><tr>
                {register.columns.map(column => <th key={column} scope="col">{t(column)}</th>)}
                {register.statuses && <th scope="col">{common('action')}</th>}
              </tr></thead>
              <tbody>
                {register.rows.map(row => (
                  <tr key={row.id}>
                    <th scope="row">{row.cells[0]}</th>
                    {row.cells.slice(1).map((cell, i) => (
                      <td key={register.columns[i + 1]} data-label={t(register.columns[i + 1])}>
                        {register.columns[i + 1] === 'status' ? <span className="console-state">{cell}</span> : cell}
                      </td>
                    ))}
                    {register.statuses && <td className="console-row-action">
                      {row.action ? <form action={save}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="value" value={row.action.value} />
                        <input type="hidden" name="q" value={filter.q} />
                        <input type="hidden" name="status" value={filter.status} />
                        <Button type="submit" variant="outline">{t(row.action.label)}<span className="sr-only"> · {row.cells[0]}</span></Button>
                      </form> : <span aria-hidden="true">—</span>}
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
            {!register.rows.length && <p className="console-empty">{common('empty')}</p>}
          </div>
        </>
      )}
      <p className="console-note">{common('demoNote')}</p>
    </section>
  );
}
