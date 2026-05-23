import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputWithLabel from './with-label';

describe('InputWithLabel', () => {
  it('renders the label and input elements', () => {
    render(<InputWithLabel />);

    // Check if the label is present
    const label = screen.getByText('Email');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'email'); // The DOM attribute is 'for', not 'htmlFor'

    // Check if the input is present
    const input = screen.getByPlaceholderText('Email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('id', 'email');
  });

  it('has the correct className for the container', () => {
    render(<InputWithLabel />);

    // Get all div elements and find the one with the grid classes
    const allDivs = screen.getAllByRole('generic', { hidden: true });
    const containerDiv = Array.from(allDivs).find(div =>
      div.classList.contains('grid') &&
      div.classList.contains('w-full') &&
      div.classList.contains('max-w-sm') &&
      div.classList.contains('items-center') &&
      div.classList.contains('gap-1.5')
    );

    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('grid');
    expect(containerDiv).toHaveClass('w-full');
    expect(containerDiv).toHaveClass('max-w-sm');
    expect(containerDiv).toHaveClass('items-center');
    expect(containerDiv).toHaveClass('gap-1.5');
  });

  it('allows text input', async () => {
    render(<InputWithLabel />);
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText('Email');
    await user.type(input, 'test@example.com');

    expect(input).toHaveValue('test@example.com');
  });

  it('can be focused', () => {
    render(<InputWithLabel />);

    const input = screen.getByPlaceholderText('Email');
    input.focus();

    expect(input).toHaveFocus();
  });

  it('associates the label with the input via for/id', () => {
    render(<InputWithLabel />);

    const label = screen.getByText('Email');
    const input = screen.getByPlaceholderText('Email');

    // Verify that the label's 'for' attribute matches the input's 'id'
    expect(label).toHaveAttribute('for', 'email');
    expect(input).toHaveAttribute('id', 'email');
  });
});