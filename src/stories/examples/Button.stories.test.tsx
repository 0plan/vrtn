import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  Primary, 
  Secondary, 
  Destructive, 
  Outline, 
  Link, 
  Ghost, 
  Loading,
  IconButton,
  CustomClassName
} from './Button.stories';
import { Button } from '@/components/ui/button';

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  Loader2: ({ className }: { className?: string }) => (
    <span className={className}>loader-icon</span>
  ),
  Mail: ({ className }: { className?: string }) => (
    <span className={className}>mail-icon</span>
  ),
}));

describe('Button Stories', () => {
  it('renders Primary story correctly', () => {
    render(<Primary.render {...Primary.args} />);

    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('renders Secondary story with correct variant', () => {
    render(<Secondary.render {...Secondary.args} />);

    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-secondary');
  });

  it('renders Destructive story with correct variant', () => {
    render(<Destructive.render {...Destructive.args} />);

    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders Outline story with correct variant', () => {
    render(<Outline.render {...Outline.args} />);

    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-input');
  });

  it('renders Link story with correct variant', () => {
    render(<Link.render {...Link.args} />);

    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-primary');
    expect(button).toHaveClass('underline-offset-4');
  });

  it('renders Ghost story with correct variant', () => {
    render(<Ghost.render {...Ghost.args} />);

    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('hover:bg-accent');
  });

  it('renders Loading story with spinner icon and disabled state', () => {
    render(<Loading.render {...Loading.args} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    // Check for the loader icon
    const loaderIcon = screen.getByText('loader-icon');
    expect(loaderIcon).toBeInTheDocument();
    expect(loaderIcon).toHaveClass('mr-2');
    expect(loaderIcon).toHaveClass('animate-spin');
    
    // Check for the text
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });

  it('renders IconButton story with mail icon', () => {
    render(<IconButton.render {...IconButton.args} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // Check for the mail icon
    const mailIcon = screen.getByText('mail-icon');
    expect(mailIcon).toBeInTheDocument();
    expect(mailIcon).toHaveClass('mr-2');
    
    // Check for the text
    expect(screen.getByText('Login with Email')).toBeInTheDocument();
  });

  it('renders CustomClassName story with custom classes', () => {
    render(<CustomClassName.render {...CustomClassName.args} />);

    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-amber-300');
    expect(button).toHaveClass('text-black');
    expect(button).toHaveClass('hover:bg-green-300');
  });

  it('applies className prop correctly', () => {
    // Test that the className prop from args is applied
    const { container } = render(<Primary.render {...Primary.args} className="bg-green-500" />);
    
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('bg-green-500');
  });

  it('has correct accessibility attributes', () => {
    render(<Primary.render {...Primary.args} />);

    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
    expect(button).not.toHaveAttribute('disabled');
  });
});