import { render, screen } from '@testing-library/react';
import TypographyH3 from './h3';

describe('TypographyH3', () => {
  it('renders an h3 element', () => {
    render(<TypographyH3 />);
    
    const h3Element = screen.getByRole('heading', { level: 3 });
    expect(h3Element).toBeInTheDocument();
    expect(h3Element.tagName).toBe('H3');
  });

  it('has correct text content', () => {
    render(<TypographyH3 />);
    
    const h3Element = screen.getByRole('heading', { level: 3 });
    expect(h3Element).toHaveTextContent('The Joke Tax');
  });

  it('has correct CSS classes', () => {
    render(<TypographyH3 />);
    
    const h3Element = screen.getByRole('heading', { level: 3 });
    expect(h3Element).toHaveClass('scroll-m-20');
    expect(h3Element).toHaveClass('text-2xl');
    expect(h3Element).toHaveClass('font-semibold');
    expect(h3Element).toHaveClass('tracking-tight');
  });

  it('renders with all expected CSS classes', () => {
    render(<TypographyH3 />);
    
    const h3Element = screen.getByRole('heading', { level: 3 });
    expect(h3Element).toHaveClass('scroll-m-20 text-2xl font-semibold tracking-tight');
  });
});