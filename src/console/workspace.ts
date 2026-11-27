import sample from './sample.json';
import type { PageKey } from './menu';

export type SiteSettings = { name: string; email: string };
export type Workspace = { [key: string]: string | SiteSettings | undefined };
export type Edit = { key: string; value: string | SiteSettings };
export type Filter = { q: string; status: string };
export type Text = (key: string) => string;

export function siteSettings(state: Workspace): SiteSettings {
  const site = state.site;
  return site && typeof site === 'object' && typeof site.name === 'string' && typeof site.email === 'string'
    ? site : { name: 'Studio Market', email: 'desk@example.com' };
}

function statusOf(row: { id: string; status: string }, state: Workspace) {
  const edited = state[row.id];
  return typeof edited === 'string' ? edited : row.status;
}

export function workQueue(state: Workspace) {
  return [
    { key: 'pendingOrders', path: '/manage/sales/orders?status=pending', count: sample.orders.filter(row => statusOf(row, state) === 'pending').length },
    { key: 'pausedMembers', path: '/manage/members/list?status=paused', count: sample.members.filter(row => statusOf(row, state) === 'paused').length },
    { key: 'draftNotices', path: '/manage/site/notices?status=draft', count: sample.notices.filter(row => statusOf(row, state) === 'draft').length },
  ];
}

export function readFilter(q: unknown, status: unknown): Filter {
  return { q: typeof q === 'string' ? q.trim().slice(0, 80) : '', status: typeof status === 'string' ? status.slice(0, 16) : '' };
}

export function editFromForm(page: PageKey, fields: FormData): Edit | undefined {
  const id = fields.get('id');
  const value = fields.get('value');
  switch (page) {
    case 'directory':
      if (sample.members.some(row => row.id === id) && (value === 'active' || value === 'paused'))
        return { key: String(id), value };
      break;
    case 'orders':
      if (value === 'paid' && sample.orders.some(row => row.id === id && row.status === 'pending'))
        return { key: String(id), value };
      break;
    case 'notices':
      if (sample.notices.some(row => row.id === id) && (value === 'published' || value === 'draft'))
        return { key: String(id), value };
      break;
    case 'settings': {
      const name = fields.get('name');
      const email = fields.get('email');
      if (typeof name === 'string' && name.trim() && name.trim().length <= 60 &&
          typeof email === 'string' && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
        return { key: 'site', value: { name: name.trim(), email: email.trim() } };
    }
  }
}

export function resultURL(path: string, fields: FormData, saved: boolean) {
  const { q, status } = readFilter(fields.get('q'), fields.get('status'));
  const query = new URLSearchParams();
  if (q) query.set('q', q);
  if (status) query.set('status', status);
  query.set('result', saved ? 'saved' : 'invalid');
  return `${path}?${query}`;
}

type Row = { id: string; cells: string[]; status?: string; action?: { label: string; value: string } };
export type Register = { columns: string[]; rows: Row[]; statuses?: string[]; metrics?: { label: string; value: string }[] };

const krw = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 });

export function registerFor(page: PageKey, state: Workspace, filter: Filter, t: Text): Register {
  const members = sample.members;
  const orders = sample.orders;
  const months = (dates: string[]) => [...new Set(dates.map(date => date.slice(0, 7)))].sort().reverse();
  const visible = (rows: Row[]) => rows.filter(row =>
    (!filter.status || row.status === filter.status) &&
    [row.id, ...row.cells].some(cell => cell.toLowerCase().includes(filter.q.toLowerCase())));
  switch (page) {
    case 'directory':
      return { columns: ['member', 'email', 'joined', 'status'], statuses: ['active', 'paused'], rows: visible(members.map(member => {
        const status = statusOf(member, state);
        return { id: member.id, cells: [member.name, member.email, member.joined, t(status)], status,
          action: status === 'active' ? { label: 'pause', value: 'paused' } : { label: 'restore', value: 'active' } };
      })) };
    case 'registrations':
      return { columns: ['month', 'joined', 'active', 'paused'], rows: months(members.map(m => m.joined)).map(month => {
        const cohort = members.filter(m => m.joined.startsWith(month));
        const active = cohort.filter(m => statusOf(m, state) === 'active').length;
        return { id: month, cells: [month, String(cohort.length), String(active), String(cohort.length - active)] };
      }), metrics: [{ label: 'allMembers', value: String(members.length) }] };
    case 'orders':
      return { columns: ['order', 'buyer', 'date', 'amount', 'status'], statuses: ['pending', 'paid', 'refunded'], rows: visible(orders.map(order => {
        const status = statusOf(order, state);
        const buyer = members.find(m => m.id === order.member)!;
        return { id: order.id, cells: [order.id, buyer.name, order.date, krw.format(order.amount), t(status)], status,
          action: status === 'pending' ? { label: 'confirm', value: 'paid' } : undefined };
      })) };
    case 'revenue': {
      const paid = orders.filter(order => statusOf(order, state) === 'paid');
      const sum = (rows: typeof orders) => rows.reduce((total, row) => total + row.amount, 0);
      return { columns: ['month', 'paidOrders', 'sales'], metrics: [
        { label: 'sales', value: krw.format(sum(paid)) }, { label: 'paidOrders', value: String(paid.length) },
      ], rows: months(orders.map(o => o.date)).map(month => {
        const rows = paid.filter(o => o.date.startsWith(month));
        return { id: month, cells: [month, String(rows.length), krw.format(sum(rows))] };
      }) };
    }
    case 'notices':
      return { columns: ['subject', 'date', 'status'], statuses: ['draft', 'published'], rows: visible(sample.notices.map(notice => {
        const status = statusOf(notice, state);
        return { id: notice.id, cells: [t(notice.title), notice.date, t(status)], status,
          action: status === 'draft' ? { label: 'publish', value: 'published' } : { label: 'unpublish', value: 'draft' } };
      })) };
    case 'settings':
      return { columns: [], rows: [] };
  }
}
