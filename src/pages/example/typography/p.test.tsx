import { render, screen } from '@testing-library/react';
import TypographyP from './p';

describe('TypographyP', () => {
  it('renders the paragraph with correct text content', () => {
    render(<TypographyP />);
    
    const paragraphElement = screen.getByText(
      /The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax\./i
    );
    
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement.tagName).toBe('P');
  });

  it('applies the correct CSS classes', () => {
    render(<TypographyP />);
    
    const paragraphElement = screen.getByText(
      /The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax\./i
    );
    
    expect(paragraphElement).toHaveClass('leading-7');
    expect(paragraphElement).toHaveClass('[&:not(:first-child)]:mt-6');
  });

  it('renders as a paragraph element', () => {
    render(<TypographyP />);
    
    const paragraphElement = screen.getByText(
      /The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax\./i
    );
    
    expect(paragraphElement.tagName).toBe('P');
  });
});