import { render, screen } from '@testing-library/react';
import TypographySmall from './small';

describe('TypographySmall', () => {
  it('renders correctly', () => {
    render(<TypographySmall />);
    
    const smallElement = screen.getByText('Email address');
    expect(smallElement).toBeInTheDocument();
    expect(smallElement.tagName).toBe('SMALL');
  });

  it('has correct CSS classes', () => {
    render(<TypographySmall />);
    
    const smallElement = screen.getByText('Email address');
    expect(smallElement).toHaveClass('text-sm');
    expect(smallElement).toHaveClass('font-medium');
    expect(smallElement).toHaveClass('leading-none');
  });

  it('contains the correct text content', () => {
    render(<TypographySmall />);
    
    const smallElement = screen.getByText('Email address');
    expect(smallElement).toHaveTextContent('Email address');
  });

  it('renders as a small tag', () => {
    render(<TypographySmall />);

    const smallElement = screen.getByText('Email address');
    expect(smallElement.tagName).toBe('SMALL');
  });
});