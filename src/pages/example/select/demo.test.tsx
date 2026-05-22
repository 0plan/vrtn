import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectDemo from './demo';

// Mock the hasPointerCapture method which is not available in jsdom
beforeAll(() => {
  // Extend the HTMLElement prototype to include hasPointerCapture method
  Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
    value: function() {
      return false;
    },
    writable: true,
  });
});

describe('SelectDemo', () => {
  it('renders the select component with placeholder', () => {
    render(<SelectDemo />);

    expect(screen.getByText('Select a fruit')).toBeInTheDocument();
  });

  it('has the correct trigger width', () => {
    render(<SelectDemo />);

    const selectTrigger = screen.getByRole('combobox');
    expect(selectTrigger).toHaveClass('w-[180px]');
  });
});