import { t } from 'i18next'
import { Link } from 'react-router-dom'
import Menu from '@components/layouts/header/menu.tsx'

const Header = () => {
  return (
    <header
      className='flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800'>
      <nav className='max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between' aria-label='Global'>
        <div className='flex items-center justify-between'>
          <Link to='/' className='flex-none text-xl font-semibold dark:text-white'>{t('projectName')}</Link>
          <div className='sm:hidden'>
            <button type='button'
                    className='hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                    data-hs-collapse='#navbar-with-collapse' aria-controls='navbar-with-collapse'
                    aria-label='Toggle navigation'
            >
              <svg className='hs-collapse-open:hidden flex-shrink-0 w-4 h-4' xmlns='http://www.w3.org/2000/svg'
                   width='24'
                   height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
                   strokeLinecap='round' strokeLinejoin='round'
              >
                <line x1='3' x2='21' y1='6' y2='6' />
                <line x1='3' x2='21' y1='12' y2='12' />
                <line x1='3' x2='21' y1='18' y2='18' />
              </svg>
              <svg className='hs-collapse-open:block hidden flex-shrink-0 w-4 h-4' xmlns='http://www.w3.org/2000/svg'
                   width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
                   strokeLinecap='round' strokeLinejoin='round'>
                <path d='M18 6 6 18' />
                <path d='m6 6 12 12' />
              </svg>
            </button>
          </div>
        </div>
        <div id='navbar-with-collapse' className='hidden basis-full grow sm:block'>
          <Menu />
        </div>
      </nav>
    </header>
  )
}

export default Header

