import { render, screen } from '@testing-library/react';
import InputDisabled from './disabled';

describe('InputDisabled', () => {
  it('renders an input element with disabled attribute', () => {
    render(<InputDisabled />);
    
    const inputElement = screen.getByPlaceholderText('Email');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toBeDisabled();
  });

  it('has the correct input type', () => {
    render(<InputDisabled />);
    
    const inputElement = screen.getByPlaceholderText('Email');
    expect(inputElement).toHaveAttribute('type', 'email');
  });

  it('has the correct placeholder text', () => {
    render(<InputDisabled />);
    
    const inputElement = screen.getByPlaceholderText('Email');
    expect(inputElement).toHaveAttribute('placeholder', 'Email');
  });

  it('is of input element type', () => {
    render(<InputDisabled />);
    
    const inputElement = screen.getByPlaceholderText('Email');
    expect(inputElement.tagName).toBe('INPUT');
  });
});