import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div id="error-page">
      <div className="relative overflow-hidden before:absolute before:start-1/2 before:top-0">
        <div className="mx-auto max-w-[85rem] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h2>{t('error.notFound.title')}</h2>
            <p>{t('error.notFound.content')}</p>
            <Link to="/">
              <Button className="mt-4">{t('error.notFound.button')}</Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
