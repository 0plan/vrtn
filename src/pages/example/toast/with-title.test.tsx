import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToastWithTitle from './with-title';

// Mock the useToast hook
const mockToast = jest.fn();

jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

describe('ToastWithTitle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button correctly', () => {
    render(<ToastWithTitle />);

    const button = screen.getByRole('button', { name: /Show Toast/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Show Toast');
  });

  it('calls the toast function when button is clicked', () => {
    render(<ToastWithTitle />);

    const button = screen.getByRole('button', { name: /Show Toast/i });
    fireEvent.click(button);

    expect(mockToast).toHaveBeenCalledTimes(1);
  });

  it('passes the correct title and description to the toast function', () => {
    render(<ToastWithTitle />);

    const button = screen.getByRole('button', { name: /Show Toast/i });
    fireEvent.click(button);

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
    });
  });

  it('uses the outline variant for the button', () => {
    render(<ToastWithTitle />);

    const button = screen.getByRole('button', { name: /Show Toast/i });
    // Check if the button has classes associated with the outline variant
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-input');
    expect(button).toHaveClass('bg-background');
  });
});