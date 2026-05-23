import { render, screen } from '@testing-library/react';
import SeparatorDemo from './demo';

describe('SeparatorDemo', () => {
  it('renders the main content correctly', () => {
    render(<SeparatorDemo />);

    // Check that the main heading is present
    expect(screen.getByText('Radix Primitives')).toBeInTheDocument();

    // Check that the description is present
    expect(screen.getByText('An open-source UI component library.')).toBeInTheDocument();

    // Check that the navigation items are present
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('Source')).toBeInTheDocument();
  });

  it('renders horizontal separator', () => {
    render(<SeparatorDemo />);

    // Look for the separator with horizontal orientation
    const separators = screen.getAllByRole('none', { hidden: true });
    const horizontalSeparatorElement = Array.from(separators).find(separator =>
      separator.getAttribute('data-orientation') === 'horizontal'
    );

    expect(horizontalSeparatorElement).toBeInTheDocument();
    expect(horizontalSeparatorElement).toHaveClass('my-4');
  });

  it('renders vertical separators', () => {
    render(<SeparatorDemo />);

    // Find vertical separators by data-orientation attribute
    const separators = screen.getAllByRole('none', { hidden: true });
    const verticalSeparators = Array.from(separators).filter(separator =>
      separator.getAttribute('data-orientation') === 'vertical'
    );

    expect(verticalSeparators).toHaveLength(2);

    // Both vertical separators should have the vertical orientation attribute
    verticalSeparators.forEach(separator => {
      expect(separator).toHaveAttribute('data-orientation', 'vertical');
    });
  });

  it('has correct layout structure', () => {
    render(<SeparatorDemo />);

    // Check for the heading and description container
    const headingContainer = screen.getByText('Radix Primitives').closest('div');
    expect(headingContainer).toHaveClass('space-y-1');

    // Find the navigation container with class names
    const navContainer = screen.getByText('Blog').parentElement;

    expect(navContainer).toHaveClass('flex');
    expect(navContainer).toHaveClass('h-5');
    expect(navContainer).toHaveClass('items-center');
    expect(navContainer).toHaveClass('space-x-4');
    expect(navContainer).toHaveClass('text-sm');
  });
});