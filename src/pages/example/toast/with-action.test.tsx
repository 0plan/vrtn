import { render, screen, fireEvent } from '@testing-library/react';
import ToastWithAction from './with-action';

// Mock the useToast hook
const mockToast = jest.fn();

jest.mock('@/components/ui/use-toast', () => {
  return {
    useToast: () => ({
      toast: mockToast,
    }),
  };
});

describe('ToastWithAction', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the button correctly', () => {
    render(<ToastWithAction />);

    const button = screen.getByRole('button', { name: /Show Toast/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Show Toast');
  });

  it('calls toast function with correct parameters when button is clicked', () => {
    render(<ToastWithAction />);

    const button = screen.getByRole('button', { name: /Show Toast/i });
    fireEvent.click(button);

    expect(mockToast).toHaveBeenCalledTimes(1);
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      action: expect.any(Object), // ToastAction component
    });
  });

  it('includes the ToastAction component in the toast call', () => {
    render(<ToastWithAction />);

    const button = screen.getByRole('button', { name: /Show Toast/i });
    fireEvent.click(button);

    const callArgs = mockToast.mock.calls[0][0];
    expect(callArgs).toHaveProperty('action');
    expect(callArgs.action).toBeDefined();
  });
});