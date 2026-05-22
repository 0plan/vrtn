import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VisualModel from './react-diagram';

// Mock the Lineage component since it uses complex diagram libraries
jest.mock('@/components/lineage', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-lineage-component">Mocked Lineage Component</div>
  ),
}));

describe('VisualModel Component', () => {
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <MemoryRouter>
        {component}
      </MemoryRouter>
    );
  };

  test('renders without crashing', () => {
    const { container } = renderWithProviders(<VisualModel />);
    expect(container).toBeInTheDocument();
  });

  test('renders the Lineage component', () => {
    renderWithProviders(<VisualModel />);
    
    const lineageComponent = screen.getByTestId('mock-lineage-component');
    expect(lineageComponent).toBeInTheDocument();
    expect(lineageComponent).toHaveTextContent('Mocked Lineage Component');
  });

  test('has correct component structure', () => {
    renderWithProviders(<VisualModel />);
    
    const lineageComponent = screen.getByTestId('mock-lineage-component');
    expect(lineageComponent.tagName).toBe('DIV');
  });

  test('contains expected content', () => {
    renderWithProviders(<VisualModel />);
    
    const lineageComponent = screen.getByTestId('mock-lineage-component');
    expect(lineageComponent).toContainHTML('div');
  });

  test('matches snapshot (mocked)', () => {
    const { container } = renderWithProviders(<VisualModel />);
    
    // Since the real Lineage component uses complex diagram libraries,
    // we verify the outer structure with the mocked component
    expect(container.firstChild).toMatchSnapshot();
  });
});