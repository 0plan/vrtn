import { render, screen } from '@testing-library/react';
import TypographyLarge from './large';

describe('TypographyLarge', () => {
  it('renders the component correctly', () => {
    render(<TypographyLarge />);
    
    const element = screen.getByText('Are you sure absolutely sure?');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('DIV');
  });

  it('has the correct CSS classes applied', () => {
    render(<TypographyLarge />);
    
    const element = screen.getByText('Are you sure absolutely sure?');
    expect(element).toHaveClass('text-lg');
    expect(element).toHaveClass('font-semibold');
    expect(element).toHaveClass('text-lg', 'font-semibold');
  });

  it('contains the expected text content', () => {
    render(<TypographyLarge />);
    
    const element = screen.getByText('Are you sure absolutely sure?');
    expect(element.textContent).toBe('Are you sure absolutely sure?');
  });

  it('matches the snapshot', () => {
    const { container } = render(<TypographyLarge />);
    expect(container.firstChild).toMatchSnapshot();
  });
});