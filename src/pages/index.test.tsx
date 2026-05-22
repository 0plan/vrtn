import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from './index';
import { useTranslation } from 'react-i18next';

// Mock the react-i18next useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const mockT = jest.fn((key: string) => {
  const translations: Record<string, string> = {
    'home.title': 'Welcome to Our Site',
    'home.subtitle': 'Amazing Experience',
    'home.content': 'This is a sample content for the home page.',
  };
  return translations[key] || key;
});

const mockedUseTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>;

describe('Index Component', () => {
  beforeEach(() => {
    mockedUseTranslation.mockReturnValue({
      t: mockT,
      i18n: {
        changeLanguage: jest.fn(),
        language: 'en',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with translation values', () => {
    render(<Index />);

    // Check that the main title is rendered with the correct text
    expect(screen.getByText(/Welcome to Our Site/)).toBeInTheDocument();
    
    // Check that the subtitle is rendered with the correct text
    expect(screen.getByText(/Amazing Experience/)).toBeInTheDocument();
    
    // Check that the content is rendered with the correct text
    expect(screen.getByText(/This is a sample content for the home page./)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Index />);

    // Check for main container classes - find by targeting the element with the specific class combination
    const mainContainer = container.querySelector('div.relative.overflow-hidden');

    expect(mainContainer).toHaveClass('relative');
    expect(mainContainer).toHaveClass('overflow-hidden');

    // Check for heading classes
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('text-gray-800');
    expect(heading).toHaveClass('dark:text-gray-200');
    expect(heading).toHaveClass('md:text-5xl');
    expect(heading).toHaveClass('lg:text-6xl');

    // Check for paragraph classes
    const paragraph = screen.getByText(/This is a sample content for the home page./);
    expect(paragraph).toHaveClass('text-lg');
    expect(paragraph).toHaveClass('text-gray-600');
    expect(paragraph).toHaveClass('dark:text-gray-400');
  });

  it('renders the gradient span element', () => {
    render(<Index />);
    
    // Check that the gradient span exists with appropriate classes
    const gradientSpan = screen.getByText(/Amazing Experience/);
    expect(gradientSpan).toHaveClass('from-blue-600');
    expect(gradientSpan).toHaveClass('to-violet-600');
    expect(gradientSpan).toHaveClass('bg-clip-text');
    expect(gradientSpan).toHaveClass('text-transparent');
  });
});