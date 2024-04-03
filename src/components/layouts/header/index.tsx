import { Link, useNavigate } from 'react-router-dom';
import Menu from '@/components/layouts/header/menu';
import MobileMenu from '@/components/layouts/header/mobileMenu';
import { useTranslation } from 'react-i18next';
import {
  Globe, Moon, Sun, User,
} from 'lucide-react';
import useLanguage from '@/stores/language';
import { Button } from '@/components/ui/button';
import SignIn from '@/components/SignIn';
import { useDarkMode } from '@/lib/dark-mode';
import { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useToast } from '@/components/ui/use-toast';

function Header() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isDarkMode, toggle } = useDarkMode();
  const { toggleLang } = useLanguage();
  const [isAuth, setIsAuth] = useState(false);
  const [storeauth, setStoreAuth] = useLocalStorage('isAuth', false);

  const navigate = useNavigate();
  const menuItems = [{ path: '/example', name: t('menu.example') }];

  const signOut = () => {
    setIsAuth(false);
    setStoreAuth(false);
    localStorage.setItem('isAuth', 'false');
    toast({
      description: 'Signed out successfully!',
    });
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth === 'true') {
      setIsAuth(true);
      setStoreAuth(true);
    } else {
      navigate('/');
    }
  }, [isAuth]);

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
          {isAuth ? (
            <Button onClick={signOut} variant="destructive">
              로그아웃
            </Button>
          ) : (
            <SignIn setIsAuth={setIsAuth} setStoreAuth={setStoreAuth} />
          )}

          <Sun
            className="cursor-pointer ml-2 hidden dark:block"
            onClick={toggle}
          />
          <Moon className="cursor-pointer ml-2 dark:hidden" onClick={toggle} />
          <Globe className="cursor-pointer ml-2" onClick={toggleLang} />
          {isAuth ? (
            <Link to="/mypage" className="text-xl font-semibold text-left">
              <Button
                className="h-10 px-2 rounded-full"
                size="sm"
                variant="ghost"
              >
                <User />
              </Button>
            </Link>
          ) : (
            ''
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
