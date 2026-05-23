import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextareaWithButton from './with-button';

describe('TextareaWithButton', () => {
  test('renders textarea and button elements', () => {
    render(<TextareaWithButton />);
    
    const textarea = screen.getByPlaceholderText('Type your message here.');
    const button = screen.getByRole('button', { name: /send message/i });
    
    expect(textarea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('allows text input in the textarea', async () => {
    const user = userEvent.setup();
    render(<TextareaWithButton />);
    
    const textarea = screen.getByPlaceholderText('Type your message here.');
    
    await user.type(textarea, 'Hello, World!');
    
    expect(textarea).toHaveValue('Hello, World!');
  });

  test('applies correct styling classes', () => {
    render(<TextareaWithButton />);

    const container = screen.getByText('Send message').parentElement; // Get the parent container
    expect(container).toHaveClass('grid');
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('gap-2');
  });

  test('button has correct text content', () => {
    render(<TextareaWithButton />);
    
    const button = screen.getByRole('button', { name: /send message/i });
    expect(button).toHaveTextContent('Send message');
  });

  test('textarea has correct placeholder', () => {
    render(<TextareaWithButton />);
    
    const textarea = screen.getByPlaceholderText('Type your message here.');
    expect(textarea).toHaveAttribute('placeholder', 'Type your message here.');
  });

  test('elements are rendered in the correct order', () => {
    render(<TextareaWithButton />);

    const container = screen.getByText('Send message').parentElement;
    const children = container.children;

    // Check that textarea comes before button in the DOM
    const textarea = screen.getByPlaceholderText('Type your message here.');
    const button = screen.getByRole('button', { name: /send message/i });

    expect(children[0]).toEqual(textarea);
    expect(children[1]).toEqual(button);
  });
});