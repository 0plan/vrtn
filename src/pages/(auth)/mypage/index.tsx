import { useTranslation } from 'react-i18next';

export default function Index() {
  const { t } = useTranslation();
  return (
    <main>
      <p>{t('menu.myPage')}</p>
    </main>
  );
}
