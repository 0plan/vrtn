import { render, screen } from '@testing-library/react';
import TypographyInlineCode from './inline-code';

describe('TypographyInlineCode', () => {
  it('renders the inline code element', () => {
    render(<TypographyInlineCode />);
    
    const codeElement = screen.getByText('@radix-ui/react-alert-dialog');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.tagName).toBe('CODE');
  });

  it('has the correct CSS classes applied', () => {
    render(<TypographyInlineCode />);
    
    const codeElement = screen.getByText('@radix-ui/react-alert-dialog');
    expect(codeElement).toHaveClass('relative');
    expect(codeElement).toHaveClass('rounded');
    expect(codeElement).toHaveClass('bg-muted');
    expect(codeElement).toHaveClass('px-[0.3rem]');
    expect(codeElement).toHaveClass('py-[0.2rem]');
    expect(codeElement).toHaveClass('font-mono');
    expect(codeElement).toHaveClass('text-sm');
    expect(codeElement).toHaveClass('font-semibold');
  });

  it('renders with the correct text content', () => {
    render(<TypographyInlineCode />);
    
    const codeElement = screen.getByText('@radix-ui/react-alert-dialog');
    expect(codeElement.textContent).toBe('@radix-ui/react-alert-dialog');
  });
});