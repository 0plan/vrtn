import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { useTranslation } from 'react-i18next';
import CommandCombobox from './combobox';

// Mock the translation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'example.command.combobox.placeholder': 'Select framework...',
        'example.command.combobox.search.placeholder': 'Search framework...',
        'example.command.combobox.search.empty': 'No framework found.',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock the shadcn/ui components with proper named exports
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/popover', () => ({
  Popover: ({ children }: any) => <div>{children}</div>,
  PopoverTrigger: ({ children }: any) => <div>{children}</div>,
  PopoverContent: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('@/components/ui/command', () => ({
  Command: ({ children }: any) => <div>{children}</div>,
  CommandInput: ({ placeholder }: any) => <input placeholder={placeholder} data-testid="command-input" />,
  CommandEmpty: ({ children }: any) => <div data-testid="command-empty">{children}</div>,
  CommandGroup: ({ children }: any) => <div data-testid="command-group">{children}</div>,
  CommandItem: ({ children, value, onSelect }: any) => (
    <div
      data-testid={`command-item-${value}`}
      onClick={() => onSelect(value)}
      data-value={value}
    >
      {children}
    </div>
  ),
}));

describe('CommandCombobox', () => {
  it('renders with initial placeholder text', () => {
    render(<CommandCombobox />);

    const button = screen.getByRole('combobox');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Select framework...');
  });

  it('displays the chevron icon', () => {
    render(<CommandCombobox />);

    const chevronIcon = screen.getByRole('combobox').querySelector('svg');
    expect(chevronIcon).toBeInTheDocument();
  });

  it('opens the popover when clicked', async () => {
    render(<CommandCombobox />);

    const comboboxButton = screen.getByRole('combobox');
    fireEvent.click(comboboxButton);

    // Wait for the content to show up
    await waitFor(() => {
      expect(screen.getByTestId('command-group')).toBeInTheDocument();
    });
  });

  it('shows command input when opened', async () => {
    render(<CommandCombobox />);

    const comboboxButton = screen.getByRole('combobox');
    fireEvent.click(comboboxButton);

    await waitFor(() => {
      expect(screen.getByTestId('command-input')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('displays framework options when opened', async () => {
    render(<CommandCombobox />);

    const comboboxButton = screen.getByRole('combobox');
    fireEvent.click(comboboxButton);

    await waitFor(() => {
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('SvelteKit')).toBeInTheDocument();
      expect(screen.getByText('Nuxt.js')).toBeInTheDocument();
      expect(screen.getByText('Remix')).toBeInTheDocument();
      expect(screen.getByText('Astro')).toBeInTheDocument();
    });
  });

  it('selects a framework option', async () => {
    render(<CommandCombobox />);

    const comboboxButton = screen.getByRole('combobox');
    fireEvent.click(comboboxButton);

    await waitFor(() => {
      const nextJsItem = screen.getByText('Next.js');
      fireEvent.click(nextJsItem);
    });

    // Check that the selected value is displayed
    expect(comboboxButton).toHaveTextContent('Next.js');
  });

  it('clears selection when the same item is clicked again', async () => {
    render(<CommandCombobox />);

    const comboboxButton = screen.getByRole('combobox');

    // First click - select Next.js
    fireEvent.click(comboboxButton);
    await waitFor(() => {
      const nextJsItem = screen.getByTestId('command-item-next.js');
      fireEvent.click(nextJsItem);
    });

    expect(comboboxButton).toHaveTextContent('Next.js');

    // Second click - click Next.js again to clear
    fireEvent.click(comboboxButton);
    await waitFor(() => {
      const nextJsItem = screen.getByTestId('command-item-next.js');
      fireEvent.click(nextJsItem);
    });

    expect(comboboxButton).toHaveTextContent('Select framework...');
  });

  it('closes the popover after selection', async () => {
    render(<CommandCombobox />);

    const comboboxButton = screen.getByRole('combobox');
    fireEvent.click(comboboxButton);

    await waitFor(() => {
      const nextJsItem = screen.getByText('Next.js');
      fireEvent.click(nextJsItem);
    });

    // Wait a bit and ensure popover content is no longer in the document
    await waitFor(() => {
      expect(() => screen.getByTestId('popover-content')).toThrow();
    }, { timeout: 100 });
  });

  it('shows checkmark for selected item', async () => {
    render(<CommandCombobox />);

    const comboboxButton = screen.getByRole('combobox');
    fireEvent.click(comboboxButton);

    await waitFor(() => {
      const nextJsItem = screen.getByTestId('command-item-next.js');
      fireEvent.click(nextJsItem);
    });

    // Reopen to see the checkmark
    fireEvent.click(comboboxButton);

    await waitFor(() => {
      // Check that the next.js item has a checkmark with opacity-100 (selected)
      const nextJsItem = screen.getByTestId('command-item-next.js');
      const checkIcon = nextJsItem.querySelector('svg.lucide-check');
      expect(checkIcon).toBeInTheDocument();
      expect(checkIcon).toHaveClass('opacity-100');
    });
  });
});