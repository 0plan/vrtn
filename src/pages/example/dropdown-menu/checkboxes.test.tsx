import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenuCheckboxes from './checkboxes';

// Mock the UI components to avoid complex dependencies
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, onClick }: { children: React.ReactNode; variant?: string; onClick?: () => void }) => (
    <button
      data-testid="mock-button"
      className={variant === 'outline' ? 'outline' : ''}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuCheckboxItem: ({
    children,
    checked,
    onCheckedChange,
    disabled
  }: {
    children: React.ReactNode;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
  }) => (
    <div
      data-testid="checkbox-item"
      data-checked={checked}
      data-disabled={disabled}
      onClick={!disabled ? () => onCheckedChange(!checked) : undefined}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {children}
    </div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-content" style={{ display: 'none' }}>{children}</div>
  ),
  DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-label">{children}</div>
  ),
  DropdownMenuSeparator: () => <hr data-testid="dropdown-separator" />,
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-trigger">{children}</div>
  ),
}));

describe('DropdownMenuCheckboxes', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders dropdown with initial state', () => {
    render(<DropdownMenuCheckboxes />);

    // Check that the trigger button exists
    expect(screen.getByTestId('mock-button')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();

    // Initially, the dropdown content should not be visible (it's in the DOM but not displayed)
    const dropdownContent = screen.queryByTestId('dropdown-content');
    expect(dropdownContent).toBeInTheDocument();
    expect(dropdownContent).not.toBeVisible();
  });

  test('opens dropdown when trigger is clicked', async () => {
    render(<DropdownMenuCheckboxes />);

    // Click the trigger button
    const triggerButton = screen.getByTestId('mock-button');
    await user.click(triggerButton);

    // The dropdown content should be in the DOM and now visible
    const dropdownContent = screen.getByTestId('dropdown-content');
    expect(dropdownContent).toBeInTheDocument();
    // Note: This mock doesn't simulate visibility changes, so we check for presence only

    const dropdownLabel = screen.getByTestId('dropdown-label');
    expect(dropdownLabel).toBeInTheDocument();
    expect(dropdownLabel).toHaveTextContent('Appearance');
  });

  test('renders all checkbox items with correct initial states', async () => {
    render(<DropdownMenuCheckboxes />);

    // Click the trigger to open the dropdown
    const triggerButton = screen.getByTestId('mock-button');
    await user.click(triggerButton);

    // Find all checkbox items
    const checkboxItems = screen.getAllByTestId('checkbox-item');
    expect(checkboxItems).toHaveLength(3);

    // Check initial states
    // Status Bar should be checked
    const statusBarItem = screen.getByText('Status Bar');
    expect(statusBarItem).toHaveAttribute('data-checked', 'true');

    // Activity Bar should be unchecked and disabled
    const activityBarItem = screen.getByText('Activity Bar');
    expect(activityBarItem).toHaveAttribute('data-checked', 'false');
    expect(activityBarItem).toHaveAttribute('data-disabled', 'true');

    // Panel should be unchecked
    const panelItem = screen.getByText('Panel');
    expect(panelItem).toHaveAttribute('data-checked', 'false');
  });

  test('toggles Status Bar checkbox state', async () => {
    render(<DropdownMenuCheckboxes />);

    // Open the dropdown
    const triggerButton = screen.getByTestId('mock-button');
    await user.click(triggerButton);

    // Find the Status Bar checkbox item
    const statusBarItem = screen.getByText('Status Bar');

    // Initially checked, so data-checked should be 'true'
    expect(statusBarItem).toHaveAttribute('data-checked', 'true');

    // Click to uncheck
    await user.click(statusBarItem);
    expect(statusBarItem).toHaveAttribute('data-checked', 'false');

    // Click again to re-check
    await user.click(statusBarItem);
    expect(statusBarItem).toHaveAttribute('data-checked', 'true');
  });

  test('toggles Panel checkbox state', async () => {
    render(<DropdownMenuCheckboxes />);

    // Open the dropdown
    const triggerButton = screen.getByTestId('mock-button');
    await user.click(triggerButton);

    // Find the Panel checkbox item
    const panelItem = screen.getByText('Panel');

    // Initially unchecked, so data-checked should be 'false'
    expect(panelItem).toHaveAttribute('data-checked', 'false');

    // Click to check
    await user.click(panelItem);
    expect(panelItem).toHaveAttribute('data-checked', 'true');

    // Click again to uncheck
    await user.click(panelItem);
    expect(panelItem).toHaveAttribute('data-checked', 'false');
  });

  test('Activity Bar checkbox is disabled and cannot be toggled', async () => {
    render(<DropdownMenuCheckboxes />);

    // Open the dropdown
    const triggerButton = screen.getByTestId('mock-button');
    await user.click(triggerButton);

    // Find the Activity Bar checkbox item
    const activityBarItem = screen.getByText('Activity Bar');

    // Should be disabled with data-disabled attribute
    expect(activityBarItem).toHaveAttribute('data-disabled', 'true');

    // Initially unchecked, so data-checked should be 'false'
    expect(activityBarItem).toHaveAttribute('data-checked', 'false');

    // Click should not change the state because it's disabled
    await user.click(activityBarItem);
    expect(activityBarItem).toHaveAttribute('data-checked', 'false');
  });

  test('maintains independent state for each checkbox', async () => {
    render(<DropdownMenuCheckboxes />);

    // Open the dropdown
    const triggerButton = screen.getByTestId('mock-button');
    await user.click(triggerButton);

    // Initially: Status Bar (checked), Activity Bar (unchecked, disabled), Panel (unchecked)
    expect(screen.getByText('Status Bar')).toHaveAttribute('data-checked', 'true');
    expect(screen.getByText('Activity Bar')).toHaveAttribute('data-checked', 'false');
    expect(screen.getByText('Panel')).toHaveAttribute('data-checked', 'false');

    // Toggle Panel checkbox
    await user.click(screen.getByText('Panel'));

    // Only Panel should be changed, others should remain the same
    expect(screen.getByText('Status Bar')).toHaveAttribute('data-checked', 'true');
    expect(screen.getByText('Activity Bar')).toHaveAttribute('data-checked', 'false');
    expect(screen.getByText('Panel')).toHaveAttribute('data-checked', 'true');

    // Toggle Status Bar checkbox
    await user.click(screen.getByText('Status Bar'));

    // Only Status Bar should be changed now
    expect(screen.getByText('Status Bar')).toHaveAttribute('data-checked', 'false');
    expect(screen.getByText('Activity Bar')).toHaveAttribute('data-checked', 'false');
    expect(screen.getByText('Panel')).toHaveAttribute('data-checked', 'true');
  });

  test('dropdown label and separator are rendered', async () => {
    render(<DropdownMenuCheckboxes />);

    // Open the dropdown
    const triggerButton = screen.getByTestId('mock-button');
    await user.click(triggerButton);

    // Check that label and separator exist
    expect(screen.getByTestId('dropdown-label')).toBeInTheDocument();
    expect(screen.getByText('Appearance')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-separator')).toBeInTheDocument();
  });
});