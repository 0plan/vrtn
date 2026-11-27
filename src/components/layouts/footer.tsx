import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className="traffic-width traffic-footer">
      <span>{t('appName')}</span>
      <a href="https://github.com/0plan/dashboard-react-vite" target="_blank" rel="noreferrer">GitHub</a>
    </footer>
  );
}
