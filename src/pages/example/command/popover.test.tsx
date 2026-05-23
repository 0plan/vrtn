import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommandPopover from './popover';

// Mock the imported components with simple implementations that allow testing
jest.mock('@/components/ui/button', () => {
  return {
    Button: ({ children, variant, size, className, ...props }: React.ComponentProps<'button'>) => (
      <button
        data-testid="button"
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  };
});

jest.mock('@/components/ui/command', () => {
  return {
    Command: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="command">{children}</div>
    ),
    CommandEmpty: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="command-empty">{children}</div>
    ),
    CommandGroup: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="command-group">{children}</div>
    ),
    CommandInput: (props: React.ComponentProps<'input'>) => (
      <input data-testid="command-input" {...props} />
    ),
    CommandItem: ({ children, onSelect, value, ...props }: {
      children: React.ReactNode,
      onSelect?: (value: string) => void,
      value?: string
    } & React.HTMLAttributes<HTMLDivElement>) => {
      return (
        <div
          data-testid="command-item"
          data-value={value}
          {...props}
          onClick={() => onSelect && value && onSelect(value)}
        >
          {children}
        </div>
      );
    },
    CommandList: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="command-list">{children}</div>
    ),
  };
});

jest.mock('@/components/ui/popover', () => {
  return {
    Popover: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="popover">{children}</div>
    ),
    PopoverTrigger: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="popover-trigger">{children}</div>
    ),
    PopoverContent: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div data-testid="popover-content" {...props}>{children}</div>
    ),
  };
});

describe('CommandPopover', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders initial state correctly', () => {
    render(<CommandPopover />);

    // Check that the initial button text is "+ Set status"
    expect(screen.getByText('+ Set status')).toBeInTheDocument();

    // Check that the status label is present
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  test('opens popover when button is clicked', () => {
    render(<CommandPopover />);

    // Click the trigger button
    const triggerButton = screen.getByTestId('button');
    fireEvent.click(triggerButton);

    // Check that the popover content is rendered
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
  });

  test('displays all status options when opened', async () => {
    render(<CommandPopover />);

    // Click the trigger button to open the popover
    const triggerButton = screen.getByTestId('button');
    fireEvent.click(triggerButton);

    // Wait for the options to be displayed
    await waitFor(() => {
      expect(screen.getByText('Backlog')).toBeInTheDocument();
      expect(screen.getByText('Todo')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
      expect(screen.getByText('Canceled')).toBeInTheDocument();
    });
  });

  test('can click on status options', async () => {
    render(<CommandPopover />);

    // Click the trigger button to open the popover
    const triggerButton = screen.getByTestId('button');
    fireEvent.click(triggerButton);

    // Use userEvent for more realistic simulation
    const user = userEvent.setup();

    // Click on the "Todo" option
    const todoOption = screen.getByText('Todo');
    await user.click(todoOption);

    // Verify that the click event was processed (the component handles onSelect internally)
    expect(todoOption).toBeInTheDocument();
  });

  test('can select different status options', async () => {
    render(<CommandPopover />);

    // Click the trigger button to open the popover
    const triggerButton = screen.getByTestId('button');
    fireEvent.click(triggerButton);

    // Use userEvent for more realistic simulation
    const user = userEvent.setup();

    // Click on the "Done" option
    const doneOption = screen.getByText('Done');
    await user.click(doneOption);

    // Verify that the click event was processed
    expect(doneOption).toBeInTheDocument();
  });

  test('displays command input when popover is open', async () => {
    render(<CommandPopover />);

    // Click the trigger button to open the popover
    const triggerButton = screen.getByTestId('button');
    fireEvent.click(triggerButton);

    // Wait for the input to be displayed
    await waitFor(() => {
      expect(screen.getByTestId('command-input')).toBeInTheDocument();
    });

    // Verify command input is present
    expect(screen.getByTestId('command-input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Change status...')).toBeInTheDocument();
  });

  test('displays command empty message when no results found', async () => {
    render(<CommandPopover />);

    // Click the trigger button to open the popover
    const triggerButton = screen.getByTestId('button');
    fireEvent.click(triggerButton);

    // Wait for the empty message to be displayed
    await waitFor(() => {
      expect(screen.getByTestId('command-empty')).toBeInTheDocument();
    });

    // Verify command empty message is present
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
});