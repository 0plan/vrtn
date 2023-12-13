import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@components/ui/dropdown-menu.tsx'
import { Link } from 'react-router-dom'

export default function MobileMenu({ menuItems }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type='button'
                className='p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent'
        >
          <svg className='flex-shrink-0 w-4 h-4' xmlns='http://www.w3.org/2000/svg'
               width='24'
               height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
               strokeLinecap='round' strokeLinejoin='round'
          >
            <line x1='3' x2='21' y1='6' y2='6' />
            <line x1='3' x2='21' y1='12' y2='12' />
            <line x1='3' x2='21' y1='18' y2='18' />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        {menuItems.map((item) => {
          return (
            <Link to={item.path}>
              <DropdownMenuItem>
                <span>{item.name}</span>
              </DropdownMenuItem>
            </Link>)
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
