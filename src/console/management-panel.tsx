import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import type { MenuPage } from './menu';
import { registerFor, siteSettings, type Filter, type Text, type Workspace } from './workspace';

type TableRow = Record<string, string> & { id: string };

export function ManagementPanel({ page, state, filter, result, t, common, save }: {
  page: MenuPage; state: Workspace; filter: Filter; result?: string;
  t: Text; common: Text; save: (data: FormData) => void | Promise<void>;
}) {
  const register = registerFor(page.key, state, filter, t);
  const site = siteSettings(state);
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<TableRow>[]>(() => register.columns.map((key) => ({
    accessorKey: key,
    header: key,
  })), [register.columns]);

  const data = useMemo<TableRow[]>(() => register.rows.map((row) => {
    const obj: TableRow = { id: row.id };
    register.columns.forEach((key, i) => { obj[key] = row.cells[i]; });
    return obj;
  }), [register.rows, register.columns]);

  const actionById = new Map(register.rows.map((row) => [row.id, row.action]));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: { sorting: [] },
  });

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
              <thead>
                <tr>
                  {table.getAllColumns().map((column) => {
                    const columnSort = table.getState().sorting.find((s) => s.id === column.id);
                    const isAsc = columnSort?.desc === false;
                    const isDesc = columnSort?.desc === true;
                    return (
                      <th key={column.id} scope="col" onClick={() => column.toggleSorting()}
                          aria-sort={isAsc ? 'ascending' : isDesc ? 'descending' : undefined}>
                        {t(column.id)}{' '}
                        {isAsc ? '▲' : isDesc ? '▼' : ''}
                      </th>
                    );
                  })}
                  {register.statuses && <th scope="col">{common('action')}</th>}
                </tr>
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => {
                  const original = row.original as TableRow;
                  const action = actionById.get(original.id);
                  const firstColumn = table.getAllColumns()[0]!;
                  return (
                    <tr key={original.id}>
                      <th scope="row">{original[firstColumn.id]}</th>
                      {table.getAllColumns().slice(1).map((column) => (
                        <td key={column.id} data-label={t(column.id)}>
                          {column.id === 'status' ? (
                            <span className="console-state">{original[column.id]}</span>
                          ) : (
                            original[column.id]
                          )}
                        </td>
                      ))}
                      {register.statuses && <td className="console-row-action">
                        {action ? <form action={save}>
                          <input type="hidden" name="id" value={original.id} />
                          <input type="hidden" name="value" value={action.value} />
                          <input type="hidden" name="q" value={filter.q} />
                          <input type="hidden" name="status" value={filter.status} />
                          <Button type="submit" variant="outline">
                            {t(action.label)}<span className="sr-only"> · {original[firstColumn.id]}</span>
                          </Button>
                        </form> : <span aria-hidden="true">—</span>}
                      </td>}
                    </tr>
                  );
                })}
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
