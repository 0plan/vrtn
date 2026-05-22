import { render, screen } from '@testing-library/react';
import TypographyH2 from './h2';

describe('TypographyH2', () => {
  it('renders the h2 element with correct text content', () => {
    render(<TypographyH2 />);
    
    const h2Element = screen.getByRole('heading', { level: 2 });
    expect(h2Element).toBeInTheDocument();
    expect(h2Element).toHaveTextContent('The People of the Kingdom');
  });

  it('applies the correct CSS classes', () => {
    render(<TypographyH2 />);
    
    const h2Element = screen.getByRole('heading', { level: 2 });
    expect(h2Element).toHaveClass('scroll-m-20');
    expect(h2Element).toHaveClass('border-b');
    expect(h2Element).toHaveClass('pb-2');
    expect(h2Element).toHaveClass('text-3xl');
    expect(h2Element).toHaveClass('font-semibold');
    expect(h2Element).toHaveClass('tracking-tight');
    expect(h2Element).toHaveClass('transition-colors');
    expect(h2Element).toHaveClass('first:mt-0');
  });

  it('renders as an h2 HTML element', () => {
    render(<TypographyH2 />);
    
    const h2Element = screen.getByRole('heading', { level: 2 });
    expect(h2Element.tagName).toBe('H2');
  });
});