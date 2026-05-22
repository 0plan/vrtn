import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import InputDemo from './demo';

describe('InputDemo', () => {
  it('renders an input element with email type', () => {
    render(<InputDemo />);
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'email');
  });

  it('renders an input element with correct placeholder', () => {
    render(<InputDemo />);
    
    const inputElement = screen.getByPlaceholderText('Email');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', 'Email');
  });

  it('renders a single input element', () => {
    render(<InputDemo />);
    
    const inputElements = screen.getAllByRole('textbox');
    expect(inputElements).toHaveLength(1);
  });
});