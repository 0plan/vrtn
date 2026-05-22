import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenuPage from './index';

// Mock the components that are imported from '@/components/ui'
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, ...props }: any) => (
    <button data-variant={variant} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: any) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <div data-testid="dropdown-trigger">{children}</div>,
  DropdownMenuContent: ({ children }: any) => <div data-testid="dropdown-content">{children}</div>,
  DropdownMenuLabel: ({ children }: any) => <div data-testid="dropdown-label">{children}</div>,
  DropdownMenuGroup: ({ children }: any) => <div data-testid="dropdown-group">{children}</div>,
  DropdownMenuItem: ({ children, disabled, ...props }: any) => (
    <div data-testid="dropdown-item" data-disabled={disabled} {...props}>
      {children}
    </div>
  ),
  DropdownMenuSeparator: () => <div data-testid="dropdown-separator" />,
  DropdownMenuShortcut: ({ children }: any) => (
    <span data-testid="dropdown-shortcut">{children}</span>
  ),
  DropdownMenuSub: ({ children }: any) => <div data-testid="dropdown-sub">{children}</div>,
  DropdownMenuSubTrigger: ({ children }: any) => (
    <div data-testid="dropdown-sub-trigger">{children}</div>
  ),
  DropdownMenuSubContent: ({ children }: any) => (
    <div data-testid="dropdown-sub-content">{children}</div>
  ),
  DropdownMenuPortal: ({ children }: any) => <div data-testid="dropdown-portal">{children}</div>,
}));

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  User: (props: any) => <svg data-testid="icon-user" {...props} />,
  CreditCard: (props: any) => <svg data-testid="icon-credit-card" {...props} />,
  Settings: (props: any) => <svg data-testid="icon-settings" {...props} />,
  Keyboard: (props: any) => <svg data-testid="icon-keyboard" {...props} />,
  Users: (props: any) => <svg data-testid="icon-users" {...props} />,
  UserPlus: (props: any) => <svg data-testid="icon-user-plus" {...props} />,
  Mail: (props: any) => <svg data-testid="icon-mail" {...props} />,
  MessageSquare: (props: any) => <svg data-testid="icon-message-square" {...props} />,
  PlusCircle: (props: any) => <svg data-testid="icon-plus-circle" {...props} />,
  Plus: (props: any) => <svg data-testid="icon-plus" {...props} />,
  Github: (props: any) => <svg data-testid="icon-github" {...props} />,
  LifeBuoy: (props: any) => <svg data-testid="icon-life-buoy" {...props} />,
  Cloud: (props: any) => <svg data-testid="icon-cloud" {...props} />,
  LogOut: (props: any) => <svg data-testid="icon-log-out" {...props} />,
}));

describe('Dropdown Menu Page', () => {
  beforeEach(() => {
    // Reset any potential state before each test
  });

  it('renders the main structure correctly', () => {
    render(<DropdownMenuPage />);
    
    // Check if the main dropdown elements are present
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('renders the top section with account-related items', () => {
    render(<DropdownMenuPage />);

    // Check for account section items
    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Keyboard shortcuts')).toBeInTheDocument();

    // Check for shortcuts - there are multiple shortcuts, so we check for specific ones
    expect(screen.getAllByTestId('dropdown-shortcut')).toHaveLength(6); // 6 shortcuts in total
  });

  it('renders the team section with invite users submenu', () => {
    render(<DropdownMenuPage />);
    
    // Check for team section items
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Invite users')).toBeInTheDocument();
    expect(screen.getByText('New Team')).toBeInTheDocument();
    
    // Check for submenu elements
    expect(screen.getByTestId('dropdown-sub')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-sub-trigger')).toBeInTheDocument();
  });

  it('renders the support section with all items', () => {
    render(<DropdownMenuPage />);
    
    // Check for support section items
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();
  });

  it('renders all icons correctly', () => {
    render(<DropdownMenuPage />);
    
    // Check that all icons are present
    expect(screen.getByTestId('icon-user')).toBeInTheDocument();
    expect(screen.getByTestId('icon-credit-card')).toBeInTheDocument();
    expect(screen.getByTestId('icon-settings')).toBeInTheDocument();
    expect(screen.getByTestId('icon-keyboard')).toBeInTheDocument();
    expect(screen.getByTestId('icon-users')).toBeInTheDocument();
    expect(screen.getByTestId('icon-user-plus')).toBeInTheDocument();
    expect(screen.getByTestId('icon-mail')).toBeInTheDocument();
    expect(screen.getByTestId('icon-message-square')).toBeInTheDocument();
    expect(screen.getByTestId('icon-plus-circle')).toBeInTheDocument();
    expect(screen.getByTestId('icon-plus')).toBeInTheDocument();
    expect(screen.getByTestId('icon-github')).toBeInTheDocument();
    expect(screen.getByTestId('icon-life-buoy')).toBeInTheDocument();
    expect(screen.getByTestId('icon-cloud')).toBeInTheDocument();
    expect(screen.getByTestId('icon-log-out')).toBeInTheDocument();
  });

  it('has correct keyboard shortcuts for main items', () => {
    render(<DropdownMenuPage />);
    
    // Check for shortcuts associated with main items
    expect(screen.getByText('⇧⌘P')).toBeInTheDocument(); // Profile
    expect(screen.getByText('⌘B')).toBeInTheDocument(); // Billing
    expect(screen.getByText('⌘S')).toBeInTheDocument(); // Settings
    expect(screen.getByText('⌘K')).toBeInTheDocument(); // Keyboard shortcuts
    expect(screen.getByText('⌘+T')).toBeInTheDocument(); // New Team
    expect(screen.getByText('⇧⌘Q')).toBeInTheDocument(); // Log out
  });

  it('disables the API menu item', () => {
    render(<DropdownMenuPage />);
    
    // Find the disabled menu item (API)
    const apiItem = screen.getByText('API').closest('[data-testid="dropdown-item"]') as HTMLElement;
    expect(apiItem).toHaveAttribute('data-disabled', 'true');
  });

  it('renders all separators', () => {
    render(<DropdownMenuPage />);

    // Count the number of separators
    const separators = screen.getAllByTestId('dropdown-separator');
    expect(separators).toHaveLength(5); // There should be 5 separators in the dropdown
  });

  it('renders submenu content when interacting', () => {
    render(<DropdownMenuPage />);
    
    // Verify submenu structure exists
    expect(screen.getByTestId('dropdown-sub-content')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('More...')).toBeInTheDocument();
    
    // Verify submenu items have their icons
    expect(screen.getByTestId('icon-mail')).toBeInTheDocument();
    expect(screen.getByTestId('icon-message-square')).toBeInTheDocument();
    expect(screen.getByTestId('icon-plus-circle')).toBeInTheDocument();
  });

  it('has the correct structure for nested dropdown elements', () => {
    render(<DropdownMenuPage />);
    
    // Check the structure of the component
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-content')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-portal')).toBeInTheDocument();
    
    // Verify that groups exist
    const groups = screen.getAllByTestId('dropdown-group');
    expect(groups).toHaveLength(2); // Should have 2 main groups
  });
});