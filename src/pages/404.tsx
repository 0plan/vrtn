import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div
      id="error-page"
      className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center"
    >
      <p className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-7xl font-extrabold text-transparent sm:text-8xl">
        404
      </p>
      <h2 className="mt-4 text-2xl font-semibold">{t('error.notFound.title')}</h2>
      <p className="mt-2 text-muted-foreground">{t('error.notFound.content')}</p>
      <Button asChild className="mt-6">
        <Link to="/">{t('error.notFound.button')}</Link>
      </Button>
    </div>
  );
}
