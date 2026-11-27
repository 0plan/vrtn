import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import '@/style/dashboard.css';

export default function App() {
  const { t } = useTranslation('common');
  return (
    <div className="traffic-shell">
      <Header />
      <main className="traffic-width traffic-main">
        <Suspense fallback={<p role="status">{t('loading')}</p>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
