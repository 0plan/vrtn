import { render, screen, fireEvent } from '@testing-library/react';
import ToggleWithText from './with-text';

describe('ToggleWithText', () => {
  it('renders the toggle component with text and icon', () => {
    render(<ToggleWithText />);

    // Check that the toggle element exists
    const toggleElement = screen.getByRole('button');
    expect(toggleElement).toBeInTheDocument();

    // Check that the text "Italic" is present
    expect(screen.getByText('Italic')).toBeInTheDocument();

    // Check for the presence of the icon (the SVG element with the italic class)
    const iconElement = toggleElement.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('lucide-italic');
  });

  it('has the correct ARIA label', () => {
    render(<ToggleWithText />);

    const toggleElement = screen.getByRole('button');
    expect(toggleElement).toHaveAttribute('aria-label', 'Toggle italic');
  });

  it('icon has the correct CSS classes', () => {
    render(<ToggleWithText />);

    // Find the SVG element directly using querySelector
    const toggleElement = screen.getByRole('button');
    const iconElement = toggleElement.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('mr-2');
    expect(iconElement).toHaveClass('h-4');
    expect(iconElement).toHaveClass('w-4');
    expect(iconElement).toHaveClass('lucide-italic');
  });

  it('toggles the pressed state when clicked', () => {
    render(<ToggleWithText />);

    const toggleElement = screen.getByRole('button');

    // Initially, the toggle should not be pressed
    expect(toggleElement).not.toHaveAttribute('data-state', 'on');
    expect(toggleElement.getAttribute('aria-pressed')).toBe('false');

    // Click the toggle to activate it
    fireEvent.click(toggleElement);

    // After clicking, the toggle should be pressed
    expect(toggleElement).toHaveAttribute('data-state', 'on');
    expect(toggleElement.getAttribute('aria-pressed')).toBe('true');

    // Click again to deactivate
    fireEvent.click(toggleElement);

    // After clicking again, the toggle should not be pressed
    expect(toggleElement).not.toHaveAttribute('data-state', 'on');
    expect(toggleElement.getAttribute('aria-pressed')).toBe('false');
  });

  it('renders with correct structure', () => {
    render(<ToggleWithText />);

    const toggleElement = screen.getByRole('button');

    // Verify that the first child is the icon and the text follows
    const iconElement = toggleElement.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('lucide');
    expect(iconElement).toHaveClass('lucide-italic');

    // Check that the text content includes "Italic"
    expect(toggleElement.textContent).toContain('Italic');
  });
});