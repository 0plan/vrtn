import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputWithText from './with-text';

describe('InputWithText', () => {
  it('renders the input component with correct elements', () => {
    render(<InputWithText />);

    // Check if the label is present
    const label = screen.getByText('Email');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');

    // Check if the input element is present
    const input = screen.getByPlaceholderText('Email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('id', 'email-2');

    // Check if the helper text is present
    const helperText = screen.getByText('Enter your email address.');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass('text-sm');
  });

  it('allows user to type in the input field', async () => {
    const user = userEvent.setup();
    render(<InputWithText />);

    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveValue('');

    await user.type(input, 'test@example.com');
    expect(input).toHaveValue('test@example.com');
  });

  it('has correct structure with grid layout', () => {
    render(<InputWithText />);

    // The container is the top-level div which contains the label, input, and helper text
    const label = screen.getByText('Email');
    const container = label.parentElement;

    expect(container).toHaveClass('grid');
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('max-w-sm');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('gap-1.5');
  });
});