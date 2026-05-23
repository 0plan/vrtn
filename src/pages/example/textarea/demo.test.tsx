import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextareaDemo from './demo';

describe('TextareaDemo', () => {
  test('renders textarea with correct placeholder', () => {
    render(<TextareaDemo />);
    
    const textarea = screen.getByPlaceholderText('Type your message here.');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', 'Type your message here.');
  });

  test('allows text input', async () => {
    const user = userEvent.setup();
    render(<TextareaDemo />);
    
    const textarea = screen.getByPlaceholderText('Type your message here.');
    await user.type(textarea, 'Hello, world!');
    
    expect(textarea).toHaveValue('Hello, world!');
  });

  test('is accessible and can receive focus', async () => {
    const user = userEvent.setup();
    render(<TextareaDemo />);
    
    const textarea = screen.getByPlaceholderText('Type your message here.');
    await user.tab(); // Focus using tab key
    
    expect(textarea).toHaveFocus();
  });

  test('renders correctly with default props', () => {
    render(<TextareaDemo />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).not.toHaveAttribute('disabled');
    expect(textarea).not.toHaveAttribute('readonly');
  });
});