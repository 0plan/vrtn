import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';
import { Default } from './Badge.stories';

describe('Badge.stories', () => {
  it('should render the default badge story', () => {
    // Using the Default story from Badge.stories.tsx
    const { container } = render(<Default.render {...Default.args} />);

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent('Badge');
    // Check for the main badge classes from the CVA
    expect(container.firstChild).toHaveClass('inline-flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('rounded-full');
    expect(container.firstChild).toHaveClass('border');
  });

  it('should render badge with default variant when no props are passed', () => {
    render(<Default.render {...Default.args} />);

    const badgeElement = screen.getByText('Badge');
    expect(badgeElement).toBeInTheDocument();
    // Check for default variant classes
    expect(badgeElement).toHaveClass('bg-primary');
    expect(badgeElement).toHaveClass('text-primary-foreground');
    expect(badgeElement).toHaveClass('border-transparent');
  });

  it('should render badge with custom children when overridden', () => {
    render(<Badge>Custom Badge Content</Badge>);

    const badgeElement = screen.getByText('Custom Badge Content');
    expect(badgeElement).toBeInTheDocument();
  });

  it('should accept and apply additional className prop', () => {
    render(<Badge className="custom-class">Test Badge</Badge>);

    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toHaveClass('custom-class');
  });

  it('should render with correct semantic tag', () => {
    const { container } = render(<Default.render {...Default.args} />);

    const badgeElement = container.firstChild as HTMLElement;
    expect(badgeElement.tagName.toLowerCase()).toBe('div'); // Badge renders as a div
  });

  it('should render with different variants correctly', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);

    const badgeElement = screen.getByText('Secondary Badge');
    expect(badgeElement).toHaveClass('bg-secondary');
    expect(badgeElement).toHaveClass('text-secondary-foreground');
  });

  it('should render outline variant correctly', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);

    const badgeElement = screen.getByText('Outline Badge');
    expect(badgeElement).toHaveClass('text-foreground');
    expect(badgeElement).not.toHaveClass('bg-primary');
  });
});