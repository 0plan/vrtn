import { render, screen } from '@testing-library/react';
import TypographyH4 from './h4';

describe('TypographyH4', () => {
  it('renders an h4 element', () => {
    render(<TypographyH4 />);
    
    const h4Element = screen.getByRole('heading', { level: 4 });
    expect(h4Element).toBeInTheDocument();
    expect(h4Element.tagName).toBe('H4');
  });

  it('renders the correct text content', () => {
    render(<TypographyH4 />);
    
    const h4Element = screen.getByRole('heading', { level: 4 });
    expect(h4Element).toHaveTextContent('People stopped telling jokes');
  });

  it('has the correct CSS classes applied', () => {
    render(<TypographyH4 />);
    
    const h4Element = screen.getByRole('heading', { level: 4 });
    expect(h4Element).toHaveClass('scroll-m-20');
    expect(h4Element).toHaveClass('text-xl');
    expect(h4Element).toHaveClass('font-semibold');
    expect(h4Element).toHaveClass('tracking-tight');
  });

  it('applies all CSS classes correctly', () => {
    render(<TypographyH4 />);
    
    const h4Element = screen.getByRole('heading', { level: 4 });
    expect(h4Element).toHaveClass('scroll-m-20 text-xl font-semibold tracking-tight');
  });
});