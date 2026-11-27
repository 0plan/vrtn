import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { managementPage } from '@/console/menu';
import { editFromForm, readFilter, resultURL } from '@/console/workspace';
import { readWorkspace, saveEdit } from '@/console/browser-workspace';
import { ManagementPanel } from '@/console/management-panel';

export default function Management() {
  const { pathname, search } = useLocation();
  const page = managementPage(pathname)!;
  const { t } = useTranslation(page.key);
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const common = (key: string) => t(`common:${key}`);
  function save(fields: FormData) {
    const edit = editFromForm(page.key, fields);
    try {
      if (edit) saveEdit(edit);
      void navigate(resultURL(page.path, fields, Boolean(edit)), { replace: true });
    } catch {
      void navigate(resultURL(page.path, fields, false), { replace: true });
    }
  }
  return (
    <>
      <Helmet><title>{`${common(page.key)} | ${common('appName')}`}</title></Helmet>
      <ManagementPanel key={page.key} page={page} state={readWorkspace()} filter={readFilter(query.get('q'), query.get('status'))}
        result={query.get('result') ?? undefined} t={t} common={common} save={save} />
    </>
  );
}
