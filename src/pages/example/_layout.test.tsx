import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExampleLayout from './_layout';
import Aside from '@/components/layouts/aside';
import { examples } from '@/data/example';

// Mock the child components to test the layout in isolation
jest.mock('@/components/layouts/aside', () => ({
  __esModule: true,
  default: ({ examples }: { examples: any }) => (
    <div data-testid="mock-aside" data-examples={JSON.stringify(examples)} />
  ),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="mock-outlet" />,
}));

describe('Example Layout', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <MemoryRouter>
        {component}
      </MemoryRouter>
    );
  };

  it('renders the layout container with flex class', () => {
    renderWithRouter(<ExampleLayout />);
    
    const layoutContainer = screen.getByRole('main').parentElement as HTMLElement;
    expect(layoutContainer).toBeInTheDocument();
    expect(layoutContainer).toHaveClass('flex');
  });

  it('renders the aside component with examples prop', () => {
    renderWithRouter(<ExampleLayout />);
    
    const aside = screen.getByTestId('mock-aside');
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveAttribute('data-examples', JSON.stringify(examples));
  });

  it('renders the aside component as a child of the flex container', () => {
    renderWithRouter(<ExampleLayout />);
    
    const aside = screen.getByTestId('mock-aside');
    const layoutContainer = screen.getByRole('main').parentElement as HTMLElement;
    
    expect(layoutContainer.contains(aside)).toBe(true);
  });

  it('renders the main container with container class', () => {
    renderWithRouter(<ExampleLayout />);
    
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('container');
  });

  it('renders the outlet component within the main container', () => {
    renderWithRouter(<ExampleLayout />);
    
    const outlet = screen.getByTestId('mock-outlet');
    const mainContainer = screen.getByRole('main');
    
    expect(outlet).toBeInTheDocument();
    expect(mainContainer.contains(outlet)).toBe(true);
  });

  it('has the correct structure with aside and main as direct children of flex container', () => {
    renderWithRouter(<ExampleLayout />);
    
    const aside = screen.getByTestId('mock-aside');
    const mainContainer = screen.getByRole('main');
    const layoutContainer = aside.parentElement as HTMLElement;
    
    expect(layoutContainer.children).toHaveLength(2);
    expect(layoutContainer.children[0]).toEqual(aside);
    expect(layoutContainer.children[1]).toEqual(mainContainer);
  });
});