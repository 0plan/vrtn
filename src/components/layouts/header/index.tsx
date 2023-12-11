import i18n, { t } from 'i18next'
import { Link } from 'react-router-dom'
import Menu from '@components/layouts/header/menu.tsx'
import ToggleDark from '@components/toggleDark.tsx'
import ToggleLanguage from '@components/toggleLanguage.tsx'
import MobileMenu from '@components/layouts/header/mobileMenu.tsx'
import '~/lib/locales.ts'
const Header = () => {
  return (
    <header
      className='flex flex-wrap justify-start z-50 w-full text-sm py-4 '>
      <nav className='flex items-center max-w-[85rem] w-full mx-auto px-4 justify-between' aria-label='Global'>
          <div className='sm:hidden'>
            <MobileMenu />
          </div>
        <Link to='/' className='text-xl font-semibold'>{t('projectName')}</Link>
        <div className='hidden basis-full grow sm:block'>
          <Menu />
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
          {t('examples')}
          {i18n.language}
        </div>
      </nav>
    </header>
  )
}

export default Header

