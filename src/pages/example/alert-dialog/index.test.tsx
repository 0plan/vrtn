import React from 'react';
import { render, screen } from '@testing-library/react';
import AlertDialogDemo from './index';
import { useTranslation } from 'react-i18next';

// Mock the alert dialog components
jest.mock('@/components/ui/alert-dialog', () => ({
  AlertDialog: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-dialog">{children}</div>,
  AlertDialogAction: ({ children }: { children: React.ReactNode }) => <button data-testid="alert-dialog-action">{children}</button>,
  AlertDialogCancel: ({ children }: { children: React.ReactNode }) => <button data-testid="alert-dialog-cancel">{children}</button>,
  AlertDialogContent: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-dialog-content">{children}</div>,
  AlertDialogDescription: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-dialog-description">{children}</div>,
  AlertDialogFooter: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-dialog-footer">{children}</div>,
  AlertDialogHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-dialog-header">{children}</div>,
  AlertDialogTitle: ({ children }: { children: React.ReactNode }) => <h2 data-testid="alert-dialog-title">{children}</h2>,
  AlertDialogTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-dialog-trigger">{children}</div>,
}));

// Mock the button component
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, onClick }: { children: React.ReactNode; variant?: string; onClick?: () => void }) => (
    <button
      data-testid="button"
      className={variant ? `btn-${variant}` : ''}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

// Mock the react-i18next useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const mockT = jest.fn((key: string) => {
  const translations: Record<string, string> = {
    'example.alertDialog.trigger': 'Delete Account',
    'example.alertDialog.title': 'Are you absolutely sure?',
    'example.alertDialog.content': 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    'example.alertDialog.cancel': 'Cancel',
    'example.alertDialog.confirm': 'Delete',
  };
  return translations[key] || key;
});

const mockedUseTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>;

describe('AlertDialogDemo', () => {
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

  it('renders the trigger button with translation', () => {
    render(<AlertDialogDemo />);

    // Check that the trigger button is rendered with the correct translated text
    expect(screen.getByText('Delete Account')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toHaveClass('btn-outline');
  });

  it('renders the alert dialog structure', () => {
    render(<AlertDialogDemo />);

    // Check that the main alert dialog element exists
    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();

    // Check that the trigger wraps the button
    expect(screen.getByTestId('alert-dialog-trigger')).toContainElement(screen.getByTestId('button'));
  });

  it('renders the alert dialog content elements', () => {
    render(<AlertDialogDemo />);

    // Check that the content element exists
    expect(screen.getByTestId('alert-dialog-content')).toBeInTheDocument();

    // Check that the header exists within the content
    const content = screen.getByTestId('alert-dialog-content');
    expect(content).toContainElement(screen.getByTestId('alert-dialog-header'));
    expect(content).toContainElement(screen.getByTestId('alert-dialog-footer'));
  });

  it('renders the alert dialog header with title and description', () => {
    render(<AlertDialogDemo />);

    // Check header section
    expect(screen.getByTestId('alert-dialog-header')).toBeInTheDocument();

    // Check title
    expect(screen.getByTestId('alert-dialog-title')).toBeInTheDocument();
    expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument();

    // Check description
    expect(screen.getByTestId('alert-dialog-description')).toBeInTheDocument();
    expect(screen.getByText(/This action cannot be undone. This will permanently delete your account and remove your data from our servers./)).toBeInTheDocument();
  });

  it('renders the alert dialog footer with action buttons', () => {
    render(<AlertDialogDemo />);

    // Check footer section
    expect(screen.getByTestId('alert-dialog-footer')).toBeInTheDocument();

    // Check action buttons
    expect(screen.getByTestId('alert-dialog-cancel')).toBeInTheDocument();
    expect(screen.getByTestId('alert-dialog-action')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('has proper translation keys called', () => {
    render(<AlertDialogDemo />);

    // Verify that translation keys are called correctly
    expect(mockT).toHaveBeenCalledWith('example.alertDialog.trigger');
    expect(mockT).toHaveBeenCalledWith('example.alertDialog.title');
    expect(mockT).toHaveBeenCalledWith('example.alertDialog.content');
    expect(mockT).toHaveBeenCalledWith('example.alertDialog.cancel');
    expect(mockT).toHaveBeenCalledWith('example.alertDialog.confirm');
  });

  it('matches the expected structure', () => {
    render(<AlertDialogDemo />);

    // Check for the complete structure of the alert dialog
    const alertDialog = screen.getByTestId('alert-dialog');
    const content = screen.getByTestId('alert-dialog-content');
    const header = screen.getByTestId('alert-dialog-header');
    const footer = screen.getByTestId('alert-dialog-footer');

    // Verify hierarchy
    expect(alertDialog).toContainElement(content);
    expect(content).toContainElement(header);
    expect(content).toContainElement(footer);

    // Header should contain title and description
    expect(header).toContainElement(screen.getByTestId('alert-dialog-title'));
    expect(header).toContainElement(screen.getByTestId('alert-dialog-description'));

    // Footer should contain the cancel and action buttons
    expect(footer).toContainElement(screen.getByTestId('alert-dialog-cancel'));
    expect(footer).toContainElement(screen.getByTestId('alert-dialog-action'));
  });
});