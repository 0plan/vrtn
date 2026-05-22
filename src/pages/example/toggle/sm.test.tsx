import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import ToggleSm from './sm';

describe('ToggleSm', () => {
  it('renders the toggle component with correct size and aria label', () => {
    render(<ToggleSm />);

    const toggleElement = screen.getByRole('button');
    expect(toggleElement).toBeInTheDocument();
    expect(toggleElement).toHaveAttribute('aria-label', 'Toggle italic');

    // Check that the toggle has the small size class
    expect(toggleElement).toHaveClass('h-9');
  });

  it('renders the italic icon', () => {
    render(<ToggleSm />);

    // Find the icon by its role or by looking for an SVG element within the toggle
    const toggleElement = screen.getByRole('button');
    const iconElement = toggleElement.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('h-4', 'w-4');
  });

  it('is initially not pressed', () => {
    render(<ToggleSm />);

    const toggleElement = screen.getByRole('button');
    expect(toggleElement).not.toHaveAttribute('data-state', 'on');
    expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles state when clicked', () => {
    render(<ToggleSm />);

    const toggleElement = screen.getByRole('button');

    // Initial state
    expect(toggleElement).not.toHaveAttribute('data-state', 'on');
    expect(toggleElement).toHaveAttribute('aria-pressed', 'false');

    // Click to toggle on
    fireEvent.click(toggleElement);
    expect(toggleElement).toHaveAttribute('data-state', 'on');
    expect(toggleElement).toHaveAttribute('aria-pressed', 'true');

    // Click to toggle off
    fireEvent.click(toggleElement);
    expect(toggleElement).not.toHaveAttribute('data-state', 'on');
    expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
  });

  it('has the correct size class applied', () => {
    render(<ToggleSm />);

    const toggleElement = screen.getByRole('button');
    // Check that the small size class is applied (typically 'h-9 w-9' for small)
    expect(toggleElement).toHaveClass('h-9');
  });

  it('applies correct classes for icon sizing', () => {
    render(<ToggleSm />);

    const toggleElement = screen.getByRole('button');
    const iconElement = toggleElement.querySelector('svg');
    expect(iconElement).toHaveClass('h-4', 'w-4');
  });
});