import { useTranslation } from 'react-i18next';

export default function Index() {
  const { t } = useTranslation();
  return (
    <main>
      <h1>{t('menu.example')}</h1>
    </main>
  );
}
