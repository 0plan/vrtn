import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContextMenuDemo from './demo';

// Mock the context menu components since they are likely complex UI components
jest.mock('@/components/ui/context-menu', () => ({
  ContextMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="context-menu">{children}</div>
  ),
  ContextMenuTrigger: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button data-testid="context-menu-trigger" className={className}>
      {children}
    </button>
  ),
  ContextMenuContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="context-menu-content" className={className}>
      {children}
    </div>
  ),
  ContextMenuItem: ({ children, inset, disabled }: { children: React.ReactNode; inset?: boolean; disabled?: boolean }) => (
    <div data-testid="context-menu-item" className={inset ? 'inset' : ''} data-disabled={disabled}>
      {children}
    </div>
  ),
  ContextMenuLabel: ({ children, inset }: { children: React.ReactNode; inset?: boolean }) => (
    <div data-testid="context-menu-label" className={inset ? 'inset' : ''}>
      {children}
    </div>
  ),
  ContextMenuCheckboxItem: ({ children, checked }: { children: React.ReactNode; checked?: boolean }) => (
    <div data-testid="context-menu-checkbox-item" data-checked={checked}>
      {children}
    </div>
  ),
  ContextMenuRadioItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-testid="context-menu-radio-item" data-value={value}>
      {children}
    </div>
  ),
  ContextMenuRadioGroup: ({ children, value }: { children: React.ReactNode; value?: string }) => (
    <div data-testid="context-menu-radio-group" data-value={value}>
      {children}
    </div>
  ),
  ContextMenuSeparator: () => <hr data-testid="context-menu-separator" />,
  ContextMenuShortcut: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="context-menu-shortcut">{children}</span>
  ),
  ContextMenuSub: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="context-menu-sub">{children}</div>
  ),
  ContextMenuSubContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="context-menu-sub-content" className={className}>
      {children}
    </div>
  ),
  ContextMenuSubTrigger: ({ children, inset }: { children: React.ReactNode; inset?: boolean }) => (
    <button data-testid="context-menu-sub-trigger" className={inset ? 'inset' : ''}>
      {children}
    </button>
  ),
}));

describe('ContextMenuDemo', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<ContextMenuDemo />);
    
    // Check that the main context menu elements are present
    expect(screen.getByTestId('context-menu')).toBeInTheDocument();
    expect(screen.getByTestId('context-menu-trigger')).toBeInTheDocument();
    expect(screen.getByText('Right click here')).toBeInTheDocument();
  });

  it('should render the context menu trigger with correct text', () => {
    render(<ContextMenuDemo />);
    
    const triggerElement = screen.getByTestId('context-menu-trigger');
    expect(triggerElement).toBeInTheDocument();
    expect(triggerElement).toHaveTextContent('Right click here');
  });

  it('should render context menu items correctly', () => {
    render(<ContextMenuDemo />);
    
    // Check that all the main menu items are present
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Forward')).toBeInTheDocument();
    expect(screen.getByText('Reload')).toBeInTheDocument();
    expect(screen.getByText('More Tools')).toBeInTheDocument();
  });

  it('should render context menu shortcuts', () => {
    render(<ContextMenuDemo />);
    
    // Check that shortcuts are rendered
    expect(screen.getByText('⌘[')).toBeInTheDocument();
    expect(screen.getByText('⌘]')).toBeInTheDocument();
    expect(screen.getByText('⌘R')).toBeInTheDocument();
  });

  it('should render checkbox items with correct state', () => {
    render(<ContextMenuDemo />);

    const checkboxItems = screen.getAllByTestId('context-menu-checkbox-item');
    expect(checkboxItems).toHaveLength(2);

    // The first checkbox item should be checked
    expect(checkboxItems[0]).toHaveAttribute('data-checked', 'true');

    // The second checkbox item should not be checked
    expect(checkboxItems[1]).not.toHaveAttribute('data-checked', 'true');
  });

  it('should render radio group with selected value', () => {
    render(<ContextMenuDemo />);
    
    const radioGroup = screen.getByTestId('context-menu-radio-group');
    expect(radioGroup).toBeInTheDocument();
    // The radio group should have Pedro Duarte selected (value "pedro")
    expect(radioGroup).toHaveAttribute('data-value', 'pedro');
  });

  it('should render radio items', () => {
    render(<ContextMenuDemo />);
    
    expect(screen.getByText('Pedro Duarte')).toBeInTheDocument();
    expect(screen.getByText('Colm Tuite')).toBeInTheDocument();
  });

  it('should render submenu with trigger and content', () => {
    render(<ContextMenuDemo />);
    
    const subTrigger = screen.getByTestId('context-menu-sub-trigger');
    expect(subTrigger).toBeInTheDocument();
    expect(subTrigger).toHaveTextContent('More Tools');
  });

  it('should render submenu items', () => {
    render(<ContextMenuDemo />);
    
    expect(screen.getByText('Save Page As...')).toBeInTheDocument();
    expect(screen.getByText('Create Shortcut...')).toBeInTheDocument();
    expect(screen.getByText('Name Window...')).toBeInTheDocument();
    expect(screen.getByText('Developer Tools')).toBeInTheDocument();
  });

  it('should render disabled menu item', () => {
    render(<ContextMenuDemo />);

    // Find all context menu items
    const menuItems = screen.getAllByTestId('context-menu-item');

    // Find the Forward menu item which should be disabled
    const forwardItem = menuItems.find(
      el => el.textContent?.includes('Forward')
    );
    expect(forwardItem).toBeInTheDocument();
    expect(forwardItem).toHaveAttribute('data-disabled', 'true');
  });

  it('should render separators', () => {
    render(<ContextMenuDemo />);
    
    const separators = screen.getAllByTestId('context-menu-separator');
    // There should be multiple separators in the menu
    expect(separators.length).toBeGreaterThan(0);
  });
});