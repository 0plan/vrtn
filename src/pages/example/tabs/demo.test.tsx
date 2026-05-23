import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import TabsDemo from './demo';

describe('TabsDemo', () => {
  beforeEach(() => {
    render(<TabsDemo />);
  });

  test('renders the tabs component with default account tab active', () => {
    // Check if the account tab trigger is present
    expect(screen.getByRole('tab', { name: 'Account' })).toBeInTheDocument();
    // Check if the account tab content is visible by default
    expect(screen.getByText('Make changes to your account here. Click save when you\'re done.')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Pedro Duarte')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByDisplayValue('@peduarte')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();

    // Check that password tab content is not visible initially
    expect(screen.queryByText('Change your password here. After saving, you\'ll be logged out.')).not.toBeInTheDocument();
  });

  test('switches to password tab when clicked', async () => {
    const user = userEvent.setup();
    // Verify account tab is active first
    const accountTab = screen.getByRole('tab', { name: 'Account' });
    expect(accountTab).toBeInTheDocument();
    expect(screen.getByText('Make changes to your account here. Click save when you\'re done.')).toBeInTheDocument();

    // Use userEvent instead of fireEvent for more complete interaction simulation
    const passwordTab = screen.getByRole('tab', { name: 'Password' });
    await user.click(passwordTab);

    // Wait for the UI to update
    // Check for content changes rather than attribute changes
    // Use more specific queries to avoid ambiguity between tab label and heading
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Change your password here. After saving, you\'ll be logged out.')).toBeInTheDocument();

    expect(screen.getByLabelText('Current password')).toBeInTheDocument();
    expect(screen.getByLabelText('New password')).toBeInTheDocument();

    // Since the password tab content is now visible, the button should also be present
    expect(screen.getByRole('button', { name: 'Save password' })).toBeInTheDocument();

    // Verify account tab content is no longer visible
    expect(screen.queryByText('Make changes to your account here. Click save when you\'re done.')).not.toBeInTheDocument();
  });

  test('switches back to account tab when clicked', () => {
    // Start by switching to password tab
    const passwordTab = screen.getByRole('tab', { name: 'Password' });
    fireEvent.click(passwordTab);
    expect(screen.getByRole('tab', { name: 'Password' })).toBeInTheDocument();

    // Switch back to account tab
    const accountTab = screen.getByRole('tab', { name: 'Account' });
    fireEvent.click(accountTab);

    // Verify account tab content is visible again
    expect(screen.getByRole('tab', { name: 'Account' })).toBeInTheDocument();
    expect(screen.getByText('Make changes to your account here. Click save when you\'re done.')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Pedro Duarte')).toBeInTheDocument();
    expect(screen.getByDisplayValue('@peduarte')).toBeInTheDocument();

    // Verify password tab content is hidden
    expect(screen.queryByText('Change your password here. After saving, you\'ll be logged out.')).not.toBeInTheDocument();
  });

  test('renders all tab elements correctly', () => {
    // Check if all tab triggers are present
    expect(screen.getByRole('tab', { name: 'Account' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Password' })).toBeInTheDocument();

    // Check if the tab list is rendered with correct structure
    const tabList = screen.getByRole('tablist');
    expect(tabList).toBeInTheDocument();

    // Verify the "Save changes" button is present (in the default account tab)
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  test('has correct initial tab state', () => {
    // Account tab should be active by default (checked via ARIA attributes)
    const accountTab = screen.getByRole('tab', { name: 'Account' });
    const passwordTab = screen.getByRole('tab', { name: 'Password' });

    // The default active tab should have aria-selected="true"
    expect(accountTab).toHaveAttribute('aria-selected', 'true');
    expect(passwordTab).toHaveAttribute('aria-selected', 'false');
  });

  test('updates tab state when switching tabs', async () => {
    const user = userEvent.setup();
    const accountTab = screen.getByRole('tab', { name: 'Account' });
    const passwordTab = screen.getByRole('tab', { name: 'Password' });

    // Initially, account tab should be selected
    expect(accountTab).toHaveAttribute('aria-selected', 'true');
    expect(passwordTab).toHaveAttribute('aria-selected', 'false');

    // Switch to password tab
    await user.click(passwordTab);

    // Check the tab states after switching
    expect(accountTab).toHaveAttribute('aria-selected', 'false');
    expect(passwordTab).toHaveAttribute('aria-selected', 'true');
  });
});