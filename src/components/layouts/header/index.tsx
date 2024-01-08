import { Link } from 'react-router-dom';
import Menu from '@components/layouts/header/menu.tsx';
import MobileMenu from '@components/layouts/header/mobileMenu.tsx';
import ToggleLanguage from '@components/layouts/header/toggleLanguage.tsx';
import ToggleDark from '@components/layouts/header/toggleDark.tsx';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();

  const menuItems = [{ path: '/example', name: t('menu.example') }];
  return (
    <header className="z-50 flex w-full flex-wrap justify-start py-4 text-sm ">
      <nav className="mx-auto flex w-full max-w-[85rem] items-center justify-between px-4">
        <div className="sm:hidden">
          <MobileMenu menuItems={menuItems} />
        </div>
        <Link to="/" className="text-xl font-semibold">
          {t('project.title')}
        </Link>
        <div className="hidden grow basis-full sm:block">
          <Menu menuItems={menuItems} />
        </div>
        <div className="flex items-center justify-end sm:px-10">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full text-center transition focus:outline-none focus:ring-2 focus:ring-offset-2">
            <ToggleDark />
          </div>
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full text-center transition focus:outline-none focus:ring-2 focus:ring-offset-2">
            <ToggleLanguage />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
