import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDarkMode } from '@/lib/dark-mode';
import authStore from '@/stores/auth';
import { toggleLanguage } from '@/lib/locales';

export default function Header() {
  const { t } = useTranslation('common');
  const { toggle } = useDarkMode();
  const { isAuth, logout } = authStore();

  return (
    <header className="traffic-header">
      <nav className="traffic-width traffic-bar">
        <Link className="traffic-brand" to="/">
          <img src="/favicon.svg" alt="" width="28" height="28" />
          {t('appName')} <span>{t('workspace')}</span>
        </Link>
        <div className="traffic-actions">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label={t('theme')} title={t('theme')}>
            <Sun className="hidden dark:block" /><Moon className="dark:hidden" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label={t('language')} title={t('language')}>
            <Globe />
          </Button>
          {isAuth && (
            <Button variant="ghost" onClick={logout} aria-label={t('signOut')} title={t('signOut')}>
              <LogOut /><span>{t('signOut')}</span>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
