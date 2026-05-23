import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextareaWithLabel from './with-label';

describe('TextareaWithLabel', () => {
  test('renders textarea with associated label', () => {
    render(<TextareaWithLabel />);

    // Check that the label exists with correct text
    const label = screen.getByText('Your message');
    expect(label).toBeInTheDocument();

    // Check that the label is associated with the textarea (using 'for' attribute in DOM)
    expect(label).toHaveAttribute('for', 'message');

    // Check that the textarea exists with correct placeholder and id
    const textarea = screen.getByPlaceholderText('Type your message here.');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'message');
  });

  test('allows user to type in textarea', async () => {
    render(<TextareaWithLabel />);

    const user = userEvent.setup();
    const textarea = screen.getByPlaceholderText('Type your message here.');

    await user.type(textarea, 'Hello, world!');

    expect(textarea).toHaveValue('Hello, world!');
  });

  test('has correct styling classes', () => {
    render(<TextareaWithLabel />);

    // Check that the container div has the correct classes
    const container = screen.getByText('Your message').parentElement;
    expect(container).toHaveClass('grid');
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('gap-1.5');
  });

  test('label is properly associated with the textarea', () => {
    render(<TextareaWithLabel />);

    const label = screen.getByText('Your message');
    const textarea = screen.getByPlaceholderText('Type your message here.');

    // Verify the label is correctly associated with the textarea
    expect(label.htmlFor).toBe('message');
    expect(textarea.id).toBe('message');
  });
});