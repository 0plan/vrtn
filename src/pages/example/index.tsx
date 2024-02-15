import { useTranslation } from 'react-i18next';

export default function index() {
  const { t } = useTranslation();

  return (
    <main className="flex">
      <p>{t('menu.example')}</p>
    </main>
  );
}
