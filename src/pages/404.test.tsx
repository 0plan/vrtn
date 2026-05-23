import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import NotFound from './404';

// Mock i18next
jest.mock('i18next', () => ({
  t: jest.fn((key: string) => {
    const translations: Record<string, string> = {
      'error.notFound.title': 'Page Not Found',
      'error.notFound.content': 'The page you are looking for might have been removed or is temporarily unavailable.',
      'error.notFound.button': 'Go back home'
    };
    return translations[key] || key;
  }),
  useTranslation: () => ({ t: (key: string) => key })
}));

// Proper mock for useTranslation hook
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: Record<string, string> = {
          'error.notFound.title': 'Page Not Found',
          'error.notFound.content': 'The page you are looking for might have been removed or is temporarily unavailable.',
          'error.notFound.button': 'Go back home'
        };
        return translations[key] || key;
      },
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  }
}));

describe('NotFound Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    );
  };

  it('renders the 404 page correctly', () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText(
      'The page you are looking for might have been removed or is temporarily unavailable.'
    )).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go back home/i })).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    renderWithProviders(<NotFound />);

    // Check if the main error container exists
    const errorContainer = screen.getByText(/Page Not Found/).closest('div[id="error-page"]');
    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer?.tagName).toBe('DIV');

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('contains a link to the home page', () => {
    renderWithProviders(<NotFound />);

    const homeLink = screen.getByRole('link');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the button with correct text', () => {
    renderWithProviders(<NotFound />);

    const button = screen.getByRole('button', { name: /Go back home/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('mt-4');
  });
});