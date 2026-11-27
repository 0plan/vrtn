import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConsoleLayout } from '@/console/console-layout';
import { managementPage } from '@/console/menu';
import authStore from '@/stores/auth';
import NotFound from '../404';

export default function AuthLayout() {
  const isAuth = authStore(state => state.isAuth);
  const { pathname } = useLocation();
  const { i18n, t } = useTranslation('common');
  if (pathname.startsWith('/manage/') && !managementPage(pathname)) return <NotFound />;
  if (!isAuth) return <Navigate to="/login" replace />;
  return (
    <ConsoleLayout path={pathname} labels={i18n.getResourceBundle(i18n.resolvedLanguage!, 'common')}>
      <Suspense fallback={<p role="status">{t('loading')}</p>}><Outlet /></Suspense>
    </ConsoleLayout>
  );
}
