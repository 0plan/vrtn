import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu.tsx';
import { Link } from 'react-router-dom';

interface IMenu {
  path: string
  name: string
}
interface IProps {
  menuItems: IMenu[]
}
export default function MobileMenu({ menuItems }: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-x-2 rounded-lg border p-2 shadow-sm disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent"
        >
          <svg
            className="h-4 w-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {menuItems.map((menu) => (
          <Link to={menu.path} key={menu.path}>
            <DropdownMenuItem>
              <span>{menu.name}</span>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
