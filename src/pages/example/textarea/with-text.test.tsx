import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextareaWithText from './with-text';

describe('TextareaWithText', () => {
  const setup = () => {
    render(<TextareaWithText />);
    const user = userEvent.setup();
    return { user };
  };

  it('renders the label correctly', () => {
    render(<TextareaWithText />);

    const label = screen.getByText('Your Message');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'message-2');
  });

  it('renders the textarea with correct placeholder', () => {
    render(<TextareaWithText />);

    const textarea = screen.getByPlaceholderText('Type your message here.');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'message-2');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('renders the helper text correctly', () => {
    render(<TextareaWithText />);

    const helperText = screen.getByText('Your message will be copied to the support team.');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass('text-sm');
    expect(helperText).toHaveClass('text-muted-foreground');
  });

  it('allows text input in the textarea', async () => {
    const { user } = setup();

    const textarea = screen.getByPlaceholderText('Type your message here.');
    expect(textarea).toBeInTheDocument();

    await user.type(textarea, 'Hello, world!');
    expect(textarea).toHaveValue('Hello, world!');
  });

  it('has correct CSS classes for the container', () => {
    render(<TextareaWithText />);

    // Find the main container div that has the grid classes
    const containerElements = screen.getAllByText('Your Message')[0].parentElement;
    expect(containerElements).toHaveClass('grid');
    expect(containerElements).toHaveClass('w-full');
    expect(containerElements).toHaveClass('gap-1.5');
  });
});