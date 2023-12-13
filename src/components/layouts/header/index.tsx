import { Link } from 'react-router-dom'
import Menu from '@components/layouts/header/menu.tsx'
import MobileMenu from '@components/layouts/header/mobileMenu.tsx'
import ToggleLanguage from '@components/layouts/header/toggleLanguage.tsx'
import ToggleDark from '@components/layouts/header/toggleDark.tsx'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()

  const menuItems = [
    { path: '/examples', name: t('menu.example') },
    { path: '/todo', name: t('menu.todo') },
    { path: '/about', name: t('menu.about') }]
  return (
    <header
      className='flex flex-wrap justify-start z-50 w-full text-sm py-4 '>
      <nav className='flex items-center max-w-[85rem] w-full mx-auto px-4 justify-between' aria-label='Global'>
        <div className='sm:hidden'>
          <MobileMenu menuItems={menuItems} />
        </div>
        <Link to='/' className='text-xl font-semibold'>{t('project.title')}</Link>
        <div className='hidden basis-full grow sm:block'>
          <Menu menuItems={menuItems} />
        </div>
        <div className='flex items-center justify-end sm:px-10'>
          <div
            className='inline-flex justify-center items-center w-10 h-10 text-center  rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition'>
            <ToggleDark />
          </div>
          <div
            className='inline-flex justify-center items-center w-10 h-10 text-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition'>
            <ToggleLanguage />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

