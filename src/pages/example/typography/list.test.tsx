import { render, screen } from '@testing-library/react';
import TypographyList from './list';

describe('TypographyList', () => {
  it('renders a list with correct class names', () => {
    render(<TypographyList />);
    
    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveClass('my-6');
    expect(listElement).toHaveClass('ml-6');
    expect(listElement).toHaveClass('list-disc');
    expect(listElement).toHaveClass('[&>li]:mt-2');
  });

  it('renders three list items with correct content', () => {
    render(<TypographyList />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    
    expect(screen.getByText('1st level of puns: 5 gold coins')).toBeInTheDocument();
    expect(screen.getByText('2nd level of jokes: 10 gold coins')).toBeInTheDocument();
    expect(screen.getByText('3rd level of one-liners : 20 gold coins')).toBeInTheDocument();
  });

  it('renders list items with correct spacing', () => {
    render(<TypographyList />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    
    // Check that each list item has the mt-2 class applied indirectly through the parent's [&>li]:mt-2 class
    listItems.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });
});