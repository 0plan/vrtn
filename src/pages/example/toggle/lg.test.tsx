import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import ToggleLg from './lg';

describe('ToggleLg', () => {
  it('renders the toggle component with correct size and aria label', () => {
    render(<ToggleLg />);

    const toggleElement = screen.getByRole('button');
    expect(toggleElement).toBeInTheDocument();
    expect(toggleElement).toHaveAttribute('aria-label', 'Toggle italic');
    // The actual large toggle classes from the test output
    expect(toggleElement).toHaveClass('h-11', 'px-5'); // These are the actual large toggle classes
  });

  it('contains the Italic icon', () => {
    render(<ToggleLg />);

    // Check for the svg element with the italic icon class by querying the container
    const buttonElement = screen.getByRole('button');
    const iconElement = buttonElement.querySelector('svg'); // Find the svg inside the button
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('lucide', 'lucide-italic');
  });

  it('toggles its state when clicked', () => {
    render(<ToggleLg />);

    const toggleElement = screen.getByRole('button');
    expect(toggleElement).toHaveAttribute('data-state', 'off'); // Initially off

    fireEvent.click(toggleElement);
    expect(toggleElement).toHaveAttribute('data-state', 'on');

    fireEvent.click(toggleElement);
    expect(toggleElement).toHaveAttribute('data-state', 'off');
  });

  it('has the correct size prop applied', () => {
    render(<ToggleLg />);

    const toggleElement = screen.getByRole('button');
    // The actual classes applied for large size
    expect(toggleElement).toHaveClass('h-11', 'px-5'); // Large toggle specific classes
  });

  it('applies correct accessibility attributes', () => {
    render(<ToggleLg />);

    const toggleElement = screen.getByRole('button');
    expect(toggleElement).toHaveAttribute('aria-label', 'Toggle italic');
    expect(toggleElement).toHaveAttribute('type', 'button');
  });
});