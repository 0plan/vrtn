import { render, screen } from '@testing-library/react';
import TypographyLead from './lead';

describe('TypographyLead', () => {
  it('renders the component correctly', () => {
    render(<TypographyLead />);
    
    const leadElement = screen.getByText(
      /A modal dialog that interrupts the user with important content and expects a response\./i
    );
    
    expect(leadElement).toBeInTheDocument();
    expect(leadElement.tagName).toBe('P');
  });

  it('applies the correct CSS classes', () => {
    render(<TypographyLead />);
    
    const leadElement = screen.getByText(
      /A modal dialog that interrupts the user with important content and expects a response\./i
    );
    
    expect(leadElement).toHaveClass('text-xl');
    expect(leadElement).toHaveClass('text-muted-foreground');
    expect(leadElement).toHaveClass('text-xl', 'text-muted-foreground');
  });

  it('has the correct element type', () => {
    render(<TypographyLead />);
    
    const leadElement = screen.getByText(
      /A modal dialog that interrupts the user with important content and expects a response\./i
    );
    
    expect(leadElement.tagName).toBe('P');
  });

  it('contains the expected text content', () => {
    render(<TypographyLead />);
    
    const leadElement = screen.getByText(
      /A modal dialog that interrupts the user with important content and expects a response\./i
    );
    
    expect(leadElement.textContent).toBe(
      'A modal dialog that interrupts the user with important content and expects a response.'
    );
  });
});