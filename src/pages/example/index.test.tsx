import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Index from './index';

// Mock translation values
const mockedT = jest.fn().mockReturnValue('Example Menu');

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: mockedT }),
}));

describe('Index Component', () => {
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <MemoryRouter>
        {component}
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mockedT.mockClear();
  });

  test('renders without crashing', () => {
    const { container } = renderWithProviders(<Index />);
    expect(container).toBeInTheDocument();
  });

  test('renders main element', () => {
    renderWithProviders(<Index />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('renders heading with correct translation', () => {
    renderWithProviders(<Index />);

    // The component should render the translated text
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();

    // Check that the translation function was called with the correct key
    expect(mockedT).toHaveBeenCalledWith('menu.example');
  });

  test('calls useTranslation hook', () => {
    renderWithProviders(<Index />);

    // Verify the mocked translation function was called
    expect(mockedT).toHaveBeenCalled();
  });

  test('displays translated text correctly', () => {
    renderWithProviders(<Index />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Example Menu');
  });

  test('has correct heading level', () => {
    renderWithProviders(<Index />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.tagName).toBe('H1');
  });
});