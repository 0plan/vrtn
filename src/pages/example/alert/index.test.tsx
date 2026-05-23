import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import AlertDemo from './index';

// Mock the i18n translation hook
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('AlertDemo Component', () => {
  beforeEach(() => {
    // Set up default translations mock
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => {
        const translations: Record<string, string> = {
          'example.alert.title': 'Alert Title',
          'example.alert.content': 'Alert content goes here.',
        };
        return translations[key];
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<AlertDemo />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders the Terminal icon', () => {
    const { container } = render(<AlertDemo />);
    // Find the SVG element directly in the container using querySelector
    const iconElement = container.querySelector('svg.lucide-terminal');
    expect(iconElement).toBeInTheDocument();
  });

  it('displays the translated title', () => {
    render(<AlertDemo />);
    const titleElement = screen.getByText('Alert Title');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the translated content', () => {
    render(<AlertDemo />);
    const contentElement = screen.getByText('Alert content goes here.');
    expect(contentElement).toBeInTheDocument();
  });

  it('correctly structures the alert component', () => {
    render(<AlertDemo />);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();

    const title = screen.getByText('Alert Title');
    expect(title).toBeInTheDocument();

    const description = screen.getByText('Alert content goes here.');
    expect(description).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<AlertDemo />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });
});