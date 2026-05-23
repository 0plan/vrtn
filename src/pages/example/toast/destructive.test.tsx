import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useToast } from '@/components/ui/use-toast';
import ToastDestructive from './destructive';

// Mock the useToast hook
const mockToast = jest.fn();

// Mock the ToastAction component
jest.mock('@/components/ui/toast', () => {
  const originalModule = jest.requireActual('@/components/ui/toast');

  return {
    ...originalModule,
    ToastAction: ({ children, altText }: { children: React.ReactNode; altText: string }) => (
      <button data-testid="toast-action" aria-label={altText}>
        {children}
      </button>
    )
  };
});

// Mock the button component
jest.mock('@/components/ui/button', () => {
  const originalModule = jest.requireActual('@/components/ui/button');

  return {
    ...originalModule,
    Button: ({ children, onClick, variant }: { children: React.ReactNode; onClick?: () => void; variant?: string }) => (
      <button
        data-testid="toast-destructive-button"
        className={variant}
        onClick={onClick}
      >
        {children}
      </button>
    )
  };
});

// Mock the useToast hook
jest.mock('@/components/ui/use-toast', () => ({
  ...jest.requireActual('@/components/ui/use-toast'),
  useToast: () => ({
    toast: mockToast
  })
}));

describe('ToastDestructive', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button with correct text', () => {
    render(<ToastDestructive />);

    const button = screen.getByTestId('toast-destructive-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Show Toast');
  });

  it('calls the toast function when the button is clicked', () => {
    render(<ToastDestructive />);

    const button = screen.getByTestId('toast-destructive-button');
    fireEvent.click(button);

    expect(mockToast).toHaveBeenCalledTimes(1);
    expect(mockToast).toHaveBeenCalledWith({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      action: expect.any(Object)
    });
  });

  it('has the correct toast configuration when clicked', () => {
    render(<ToastDestructive />);

    const button = screen.getByTestId('toast-destructive-button');
    fireEvent.click(button);

    const calledWith = mockToast.mock.calls[0][0];

    expect(calledWith.variant).toBe('destructive');
    expect(calledWith.title).toBe('Uh oh! Something went wrong.');
    expect(calledWith.description).toBe('There was a problem with your request.');
    expect(calledWith.action).toBeDefined();
  });
});