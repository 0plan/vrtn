import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuPortal,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@components/ui/dropdown-menu.tsx'
import { Button } from '@components/ui/button.tsx'
import {
  Cloud,
  CreditCard, Github,
  Keyboard, LifeBuoy, LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users
} from 'lucide-react'

export default function MobileMenu() {
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className='mr-2 h-4 w-4' />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className='mr-2 h-4 w-4' />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className='mr-2 h-4 w-4' />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className='mr-2 h-4 w-4' />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className='mr-2 h-4 w-4' />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className='mr-2 h-4 w-4' />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus className='mr-2 h-4 w-4' />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className='mr-2 h-4 w-4' />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className='mr-2 h-4 w-4' />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className='mr-2 h-4 w-4' />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
