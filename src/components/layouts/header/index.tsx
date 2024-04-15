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
    <header className="z-50 flex w-full flex-wrap justify-start py-4 text-sm fixed top-0 backdrop-blur-sm">
      <nav className="mx-auto flex w-full max-w-[85rem] items-center justify-between px-4">
        <div className="sm:hidden">
          <MobileMenu menuItems={menuItems} />
        </div>
        <Link to="/" className="text-xl font-semibold text-left">
          {t('project.title')}
        </Link>
        <div className="hidden grow basis-full sm:block">
          <Menu menuItems={menuItems} />
        </div>
        <div className="flex items-center justify-end sm:px-10">
          <Sun
            className="cursor-pointer ml-2 hidden dark:block"
            onClick={toggle}
          />
          <Moon className="cursor-pointer ml-2 dark:hidden" onClick={toggle} />
          <Globe className="cursor-pointer ml-2" onClick={toggleLang} />
          {
           isAuth && (
           <Link to="/mypage" className="ml-2">
             <User />
           </Link>
           )
          }
          {isAuth ? (
            <LogOut onClick={signOut} className="cursor-pointer ml-2" />
          ) : (

            <SignIn />
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
