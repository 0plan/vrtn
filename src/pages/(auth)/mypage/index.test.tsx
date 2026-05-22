import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import Index from './index';

// Mock the react-i18next hook
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('Index', () => {
  const mockT = jest.fn((key: string) => {
    if (key === 'menu.myPage') return 'My Page';
    return key;
  });

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: mockT,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the translated menu.myPage text', () => {
    render(<Index />);
    
    expect(screen.getByText('My Page')).toBeInTheDocument();
    expect(mockT).toHaveBeenCalledWith('menu.myPage');
  });

  it('has a main element as the root container', () => {
    render(<Index />);
    
    const mainElement = screen.getByRole('main');
    expect(mainElement.tagName).toBe('MAIN');
  });

  it('displays the correct translation key', () => {
    render(<Index />);
    
    expect(mockT).toHaveBeenCalledWith('menu.myPage');
    expect(mockT).toHaveBeenCalledTimes(1);
  });
});