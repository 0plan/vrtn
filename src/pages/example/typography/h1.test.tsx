import { render, screen } from '@testing-library/react';
import TypographyH1 from './h1';

describe('TypographyH1', () => {
  it('renders the component with correct text', () => {
    render(<TypographyH1 />);
    const headingElement = screen.getByText('Taxing Laughter: The Joke Tax Chronicles');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
  });

  it('applies the correct CSS classes', () => {
    render(<TypographyH1 />);
    const headingElement = screen.getByText('Taxing Laughter: The Joke Tax Chronicles');
    expect(headingElement).toHaveClass('scroll-m-20');
    expect(headingElement).toHaveClass('text-4xl');
    expect(headingElement).toHaveClass('font-extrabold');
    expect(headingElement).toHaveClass('tracking-tight');
    expect(headingElement).toHaveClass('lg:text-5xl');
  });

  it('renders as an h1 element', () => {
    render(<TypographyH1 />);
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent('Taxing Laughter: The Joke Tax Chronicles');
  });
});