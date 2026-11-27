import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  const { t } = useTranslation('not-found');

  return (
    <div
      id="error-page"
      className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center"
    >
      <Helmet><title>{`${t('title')} | ${t('common:appName')}`}</title></Helmet>
      <p className="text-7xl font-extrabold text-foreground sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold">{t('title')}</h1>
      <p className="mt-2 text-muted-foreground">{t('description')}</p>
      <Button asChild className="mt-6 min-h-11">
        <Link to="/">{t('home')}</Link>
      </Button>
    </div>
  );
}
