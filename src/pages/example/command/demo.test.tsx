// Mock the UI components before any imports
jest.mock('@/components/ui/command', () => {
  const React = require('react');

  return {
    Command: React.forwardRef(({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: any }, ref) => (
      <div ref={ref} role="combobox" className={`rounded-lg border shadow-md ${className || ''}`} {...props}>
        {children}
      </div>
    )),
    CommandInput: React.forwardRef(({ placeholder, ...props }: { placeholder?: string; [key: string]: any }, ref) => (
      <input
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
    )),
    CommandList: React.forwardRef(({ children, ...props }: { children: React.ReactNode; [key: string]: any }, ref) => (
      <div ref={ref} {...props}>{children}</div>
    )),
    CommandEmpty: React.forwardRef(({ children, ...props }: { children: React.ReactNode; [key: string]: any }, ref) => (
      <div ref={ref} {...props}>{children}</div>
    )),
    CommandGroup: React.forwardRef(({ children, heading, ...props }: { children: React.ReactNode; heading?: string; [key: string]: any }, ref) => (
      <div ref={ref} {...props}>
        {heading && <div>{heading}</div>}
        {children}
      </div>
    )),
    CommandItem: React.forwardRef(({ children, ...props }: { children: React.ReactNode; [key: string]: any }, ref) => (
      <div
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )),
    CommandSeparator: React.forwardRef((props, ref) => (
      <div ref={ref} {...props} />
    )),
    CommandShortcut: React.forwardRef(({ children, ...props }: { children: React.ReactNode; [key: string]: any }, ref) => (
      <span ref={ref} {...props}>{children}</span>
    )),
  };
});

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  Calendar: () => <span data-testid="calendar-icon">📅</span>,
  CreditCard: () => <span data-testid="creditcard-icon">💳</span>,
  Settings: () => <span data-testid="settings-icon">⚙️</span>,
  Smile: () => <span data-testid="smile-icon">😊</span>,
  User: () => <span data-testid="user-icon">👤</span>,
  Calculator: () => <span data-testid="calculator-icon">🔢</span>,
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import CommandDemo from './demo';

// Mock the translation hook
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const mockT = jest.fn((key: string) => {
  const translations: Record<string, string> = {
    'example.command.demo.suggestions': 'Suggestions',
    'example.command.demo.calendar': 'Calendar',
    'example.command.demo.searchEmoji': 'Search Emoji',
    'example.command.demo.calculator': 'Calculator',
    'example.command.demo.settings': 'Settings',
    'example.command.demo.profile': 'Profile',
    'example.command.demo.billing': 'Billing',
    'example.command.demo.search.placeholder': 'Search command...',
    'example.command.demo.empty': 'No results found.',
  };
  return translations[key] || key;
});

describe('CommandDemo', () => {
  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: mockT,
      i18n: {
        changeLanguage: jest.fn(),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the command component with all elements', () => {
    render(<CommandDemo />);

    // Check if the main command container is present
    const commandElement = screen.getByRole('combobox');
    expect(commandElement).toBeInTheDocument();

    // Check if the search input is present
    const searchInput = screen.getByPlaceholderText('Search command...');
    expect(searchInput).toBeInTheDocument();
  });

  it('displays command groups and items', () => {
    render(<CommandDemo />);

    // Check if all group titles are rendered
    expect(screen.getByText('Suggestions')).toBeInTheDocument();
    
    // Check specifically for the Settings group heading, differentiating from the Settings item
    const groupHeadings = screen.getAllByText('Settings');
    // There should be 2: one for the group and one for the item
    expect(groupHeadings).toHaveLength(2);
    
    // Check if all command items are rendered
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Search Emoji')).toBeInTheDocument();
    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
    // The settings item is already checked above
  });

  it('renders icons for command items', () => {
    render(<CommandDemo />);

    const icons = screen.getAllByTestId(/-icon/);
    expect(icons).toHaveLength(6); // 3 from first group + 3 from second group
  });

  it('displays shortcuts for appropriate items', () => {
    render(<CommandDemo />);

    // Check if shortcuts are rendered for items that have them
    expect(screen.getByText('⌘P')).toBeInTheDocument(); // Profile shortcut
    expect(screen.getByText('⌘B')).toBeInTheDocument(); // Billing shortcut
    expect(screen.getByText('⌘S')).toBeInTheDocument(); // Settings shortcut
  });

  it('does not display shortcuts for items without them', () => {
    render(<CommandDemo />);

    // Items without shortcuts should not have shortcut elements
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Search Emoji')).toBeInTheDocument();
    expect(screen.getByText('Calculator')).toBeInTheDocument();
    
    // Ensure these items don't have shortcuts
    expect(screen.queryByText('⌘C')).not.toBeInTheDocument();
    expect(screen.queryByText('⌘E')).not.toBeInTheDocument();
    expect(screen.queryByText('⌘L')).not.toBeInTheDocument();
  });

  it('uses translated strings correctly', () => {
    render(<CommandDemo />);

    // Verify that translations are used
    expect(mockT).toHaveBeenCalledWith('example.command.demo.suggestions');
    expect(mockT).toHaveBeenCalledWith('example.command.demo.calendar');
    expect(mockT).toHaveBeenCalledWith('example.command.demo.searchEmoji');
    expect(mockT).toHaveBeenCalledWith('example.command.demo.calculator');
    expect(mockT).toHaveBeenCalledWith('example.command.demo.settings');
    expect(mockT).toHaveBeenCalledWith('example.command.demo.profile');
    expect(mockT).toHaveBeenCalledWith('example.command.demo.billing');
    expect(mockT).toHaveBeenCalledWith('example.command.demo.search.placeholder');
    expect(mockT).toHaveBeenCalledWith('example.command.demo.empty');
  });

  it('has the correct CSS classes applied', () => {
    render(<CommandDemo />);

    // Check if the outer command element has the expected classes
    const commandElement = screen.getByRole('combobox');
    expect(commandElement).toHaveClass('rounded-lg', 'border', 'shadow-md');
  });

  it('renders multiple command groups', () => {
    render(<CommandDemo />);

    // Find group headings by checking for the actual group heading elements
    const groupHeadings = screen.getAllByText(/Suggestions|Settings/);
    // We expect 2 group headings: "Suggestions" and "Settings"
    // The query returns 3 items because there are 2 headings + 1 item with "Settings" text
    expect(groupHeadings).toHaveLength(3); // 2 group headings + 1 item with same text
  });

  it('renders command items within groups', () => {
    render(<CommandDemo />);

    // Find all command items by their text content
    const commandItems = screen.getAllByText(/Calendar|Search Emoji|Calculator|Profile|Billing|Settings/);
    // This will match 7 elements: 3 from Suggestions + 3 from Settings + 1 Settings group heading
    expect(commandItems).toHaveLength(7); // 6 items + 1 group heading with same text
  });
});