import { render, screen } from '@testing-library/react';
import TypographyBlockquote from './blockquote';

describe('TypographyBlockquote', () => {
  it('renders the blockquote element', () => {
    render(<TypographyBlockquote />);
    
    const blockquoteElement = screen.getByRole('blockquote');
    expect(blockquoteElement).toBeInTheDocument();
    expect(blockquoteElement).toHaveClass('mt-6', 'border-l-2', 'pl-6', 'italic');
  });

  it('contains the expected quote text', () => {
    render(<TypographyBlockquote />);
    
    const blockquoteElement = screen.getByRole('blockquote');
    expect(blockquoteElement).toHaveTextContent(/After all.*he said.*everyone enjoys a good joke/i);
  });

  it('has the correct styling classes', () => {
    render(<TypographyBlockquote />);
    
    const blockquoteElement = screen.getByRole('blockquote');
    expect(blockquoteElement).toHaveClass('mt-6');
    expect(blockquoteElement).toHaveClass('border-l-2');
    expect(blockquoteElement).toHaveClass('pl-6');
    expect(blockquoteElement).toHaveClass('italic');
  });
});