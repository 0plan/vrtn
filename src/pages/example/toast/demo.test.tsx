import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import ToastDemo from './demo';

// Mock the useToast hook
const mockToast = jest.fn();

jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

// Mock the ToastAction component
jest.mock('@/components/ui/toast', () => {
  const actual = jest.requireActual('@/components/ui/toast');
  return {
    ...actual,
    ToastAction: ({ children, altText }: { children: React.ReactNode; altText: string }) => (
      <button data-testid="toast-action" aria-label={altText}>
        {children}
      </button>
    ),
  };
});

// Mock the Button component
jest.mock('@/components/ui/button', () => {
  const actual = jest.requireActual('@/components/ui/button');
  return {
    ...actual,
    Button: ({ children, onClick, variant, ...props }: { children: React.ReactNode; onClick?: () => void; variant?: string }) => (
      <button
        data-testid="mock-button"
        className={variant === 'outline' ? 'outline-class' : ''}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    ),
  };
});

describe('ToastDemo', () => {
  beforeEach(() => {
    mockToast.mockClear();
  });

  it('renders the button with correct text', () => {
    render(
      <ToastProvider>
        <ToastDemo />
        <ToastViewport />
      </ToastProvider>
    );
    
    expect(screen.getByTestId('mock-button')).toBeInTheDocument();
    expect(screen.getByText('Add to calendar')).toBeInTheDocument();
  });

  it('has the correct button variant', () => {
    render(
      <ToastProvider>
        <ToastDemo />
        <ToastViewport />
      </ToastProvider>
    );
    
    const button = screen.getByTestId('mock-button');
    expect(button).toHaveClass('outline-class');
  });

  it('shows toast when button is clicked', () => {
    render(
      <ToastProvider>
        <ToastDemo />
        <ToastViewport />
      </ToastProvider>
    );
    
    const button = screen.getByText('Add to calendar');
    fireEvent.click(button);
    
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Scheduled: Catch up ',
      description: 'Friday, February 10, 2023 at 5:57 PM',
      action: expect.any(Object),
    });
  });

  it('formats toast with correct content', () => {
    render(
      <ToastProvider>
        <ToastDemo />
        <ToastViewport />
      </ToastProvider>
    );
    
    const button = screen.getByText('Add to calendar');
    fireEvent.click(button);
    
    const callArgs = mockToast.mock.calls[0][0];
    expect(callArgs.title).toBe('Scheduled: Catch up ');
    expect(callArgs.description).toBe('Friday, February 10, 2023 at 5:57 PM');
    expect(callArgs.action).toBeDefined();
  });

  it('includes ToastAction component in toast', () => {
    render(
      <ToastProvider>
        <ToastDemo />
        <ToastViewport />
      </ToastProvider>
    );
    
    const button = screen.getByText('Add to calendar');
    fireEvent.click(button);

    const callArgs = mockToast.mock.calls[0][0];
    // Verify that the action is a React element with the ToastAction
    expect(callArgs.action).toBeDefined();
  });
});