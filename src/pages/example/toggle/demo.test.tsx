import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleDemo from './demo';

describe('ToggleDemo', () => {
  test('renders toggle component with Bold icon', () => {
    render(<ToggleDemo />);

    // Check if the toggle button is in the document
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();

    // Find the SVG element inside the button
    const svgElement = toggleButton.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('lucide', 'lucide-bold', 'h-4', 'w-4');
  });

  test('has correct aria-label', () => {
    render(<ToggleDemo />);

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveAttribute('aria-label', 'Toggle italic');
  });

  test('can be toggled on and off', () => {
    render(<ToggleDemo />);

    const toggleButton = screen.getByRole('button');

    // Initially, the toggle has aria-pressed="false"
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

    // Click to toggle on
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

    // Click to toggle off
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
  });

  test('applies correct data-state attribute for toggle state', () => {
    render(<ToggleDemo />);

    const toggleButton = screen.getByRole('button');

    // Initially, check for default data-state
    expect(toggleButton).toHaveAttribute('data-state', 'off');

    // Toggle on
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('data-state', 'on');

    // Toggle off
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('data-state', 'off');
  });
});