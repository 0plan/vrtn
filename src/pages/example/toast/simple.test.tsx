import { render, screen, fireEvent } from '@testing-library/react';
import { useToast } from '@/components/ui/use-toast';
import ToastSimple from './simple';

// Mock the useToast hook to control its behavior during tests
const mockToast = jest.fn();

// Create a mock implementation of useToast
jest.mock('@/components/ui/use-toast', () => {
  const actual = jest.requireActual('@/components/ui/use-toast');
  return {
    ...actual,
    useToast: jest.fn(() => ({
      toast: mockToast,
    })),
  };
});

describe('ToastSimple', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the button with correct text', () => {
    render(<ToastSimple />);

    const button = screen.getByText('Show Toast');
    expect(button).toBeInTheDocument();
    // Check that the button is rendered as a button element
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  it('calls the toast function when button is clicked', () => {
    render(<ToastSimple />);

    const button = screen.getByText('Show Toast');
    fireEvent.click(button);

    expect(mockToast).toHaveBeenCalledTimes(1);
    expect(mockToast).toHaveBeenCalledWith({
      description: 'Your message has been sent.',
    });
  });

  it('does not call toast function on initial render', () => {
    render(<ToastSimple />);

    expect(mockToast).not.toHaveBeenCalled();
  });

  it('uses the useToast hook correctly', () => {
    const mockUseToast = useToast as jest.Mock;

    render(<ToastSimple />);

    expect(mockUseToast).toHaveBeenCalled();
  });
});