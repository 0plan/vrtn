import { render, screen } from '@testing-library/react';
import TypographyMuted from './muted';

describe('TypographyMuted', () => {
  it('renders the component', () => {
    render(<TypographyMuted />);
    
    const paragraphElement = screen.getByText('Enter your email address.');
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement.tagName).toBe('P');
  });

  it('applies the correct CSS classes', () => {
    render(<TypographyMuted />);
    
    const paragraphElement = screen.getByText('Enter your email address.');
    expect(paragraphElement).toHaveClass('text-sm');
    expect(paragraphElement).toHaveClass('text-muted-foreground');
  });

  it('has the correct content', () => {
    render(<TypographyMuted />);
    
    const paragraphElement = screen.getByText('Enter your email address.');
    expect(paragraphElement.textContent).toBe('Enter your email address.');
  });
});