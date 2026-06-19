import { Link } from 'react-router-dom';
import Menu from '@/components/layouts/header/menu';
import MobileMenu from '@/components/layouts/header/mobileMenu';
import { useTranslation } from 'react-i18next';
import {
  Globe, LogOut, Moon, Sun, User,
} from 'lucide-react';
import useLanguage from '@/stores/language';
import SignIn from '@/components/SignIn';
import { useDarkMode } from '@/lib/dark-mode';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import authStore from '@/stores/auth';

function Header() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { toggle } = useDarkMode();
  const { toggleLang } = useLanguage();
  const { logout, isAuth } = authStore();
  const menuItems = [{ path: '/example', name: t('menu.example') }];

  const signOut = () => {
    logout();
    toast({
      description: 'Signed out successfully!',
    });
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-[72px] w-full max-w-[85rem] items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <div className="sm:hidden">
            <MobileMenu menuItems={menuItems} />
          </div>
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight transition-colors hover:text-primary"
          >
            {t('project.title')}
          </Link>
        </div>
        <div className="hidden grow sm:block">
          <Menu menuItems={menuItems} />
        </div>
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            <Sun className="hidden dark:block" />
            <Moon className="dark:hidden" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLang}
            aria-label="Change language"
          >
            <Globe />
          </Button>
          {isAuth && (
            <Button variant="ghost" size="icon" asChild aria-label={t('menu.myPage')}>
              <Link to="/mypage">
                <User />
              </Link>
            </Button>
          )}
          {isAuth ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              aria-label={t('signOut')}
            >
              <LogOut />
            </Button>
          ) : (
            <SignIn />
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
