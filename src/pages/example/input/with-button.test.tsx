import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import InputWithButton from './with-button';

describe('InputWithButton', () => {
  it('renders input and button elements', () => {
    render(<InputWithButton />);

    const inputElement = screen.getByPlaceholderText('Email');
    const buttonElement = screen.getByText('Subscribe');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders with correct input type', () => {
    render(<InputWithButton />);

    const inputElement = screen.getByPlaceholderText('Email');

    expect(inputElement).toHaveAttribute('type', 'email');
  });

  it('renders with correct button type', () => {
    render(<InputWithButton />);

    const buttonElement = screen.getByText('Subscribe');

    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  it('has the correct container structure', () => {
    render(<InputWithButton />);

    // Get the input element first, then navigate to its parent container
    const inputElement = screen.getByPlaceholderText('Email');
    const container = inputElement.parentElement;

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('max-w-sm');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('space-x-2');
  });

  it('renders Input and Button components', () => {
    render(<InputWithButton />);

    const inputElement = screen.getByPlaceholderText('Email');
    const buttonElement = screen.getByText('Subscribe');

    expect(inputElement).toBeInstanceOf(HTMLInputElement);
    expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
  });
});