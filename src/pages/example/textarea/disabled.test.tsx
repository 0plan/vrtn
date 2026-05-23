import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextareaDisabled from './disabled';

describe('TextareaDisabled', () => {
  it('renders a textarea with disabled attribute', () => {
    render(<TextareaDisabled />);
    
    const textarea = screen.getByPlaceholderText('Type your message here.');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toBeDisabled();
  });

  it('has the correct placeholder text', () => {
    render(<TextareaDisabled />);
    
    const textarea = screen.getByPlaceholderText('Type your message here.');
    expect(textarea).toHaveAttribute('placeholder', 'Type your message here.');
  });

  it('prevents user input when disabled', async () => {
    render(<TextareaDisabled />);
    
    const textarea = screen.getByPlaceholderText('Type your message here.');
    expect(textarea).toBeDisabled();
    
    // Try to type in the textarea - should not work
    await userEvent.type(textarea, 'Test input');
    expect(textarea).toHaveValue('');
  });

  it('renders with proper accessibility attributes', () => {
    render(<TextareaDisabled />);

    const textarea = screen.getByPlaceholderText('Type your message here.');
    expect(textarea).toHaveAttribute('disabled');
  });

  it('matches the snapshot', () => {
    const { container } = render(<TextareaDisabled />);
    expect(container.firstChild).toMatchSnapshot();
  });
});