import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default } from './AlertDialog.stories';

// Mock the alert dialog components since we're testing the story
// We'll mock the actual implementation to avoid complexity
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

// Mock the button component as well
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

describe('AlertDialog Stories', () => {
  beforeEach(() => {
    // Clear any previous mocks
    jest.clearAllMocks();
  });

  it('should render the default AlertDialog story', () => {
    const DefaultComponent = Default.render || (() => null);
    render(<DefaultComponent {...Default.args} />);

    // Check that the main alert dialog element is present
    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();

    // Check that the trigger button is rendered
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByText('Show Dialog')).toBeInTheDocument();
  });

  it('should render the AlertDialog content elements', () => {
    const DefaultComponent = Default.render || (() => null);
    render(<DefaultComponent {...Default.args} />);

    // Check header section
    expect(screen.getByTestId('alert-dialog-header')).toBeInTheDocument();

    // Check title
    expect(screen.getByTestId('alert-dialog-title')).toBeInTheDocument();
    expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument();

    // Check description
    expect(screen.getByTestId('alert-dialog-description')).toBeInTheDocument();
    expect(screen.getByText(/This action cannot be undone/i)).toBeInTheDocument();

    // Check footer section
    expect(screen.getByTestId('alert-dialog-footer')).toBeInTheDocument();

    // Check action buttons
    expect(screen.getByTestId('alert-dialog-cancel')).toBeInTheDocument();
    expect(screen.getByTestId('alert-dialog-action')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('should render with the proper content structure', () => {
    const DefaultComponent = Default.render || (() => null);
    render(<DefaultComponent {...Default.args} />);

    // Check that the content wrapper exists
    expect(screen.getByTestId('alert-dialog-content')).toBeInTheDocument();

    // Check that all major sections exist within the structure
    const alertDialog = screen.getByTestId('alert-dialog');
    const header = screen.getByTestId('alert-dialog-header');
    const content = screen.getByTestId('alert-dialog-content');
    const footer = screen.getByTestId('alert-dialog-footer');

    // Verify hierarchy
    expect(alertDialog).toContainElement(content);
    expect(content).toContainElement(header);
    expect(content).toContainElement(footer);
  });

  it('should match the default story snapshot', () => {
    const DefaultComponent = Default.render || (() => null);
    const { container } = render(<DefaultComponent {...Default.args} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});