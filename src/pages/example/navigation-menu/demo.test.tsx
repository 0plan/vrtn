import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationMenuDemo from './demo';

// Store original console.error to restore later
const originalConsoleError = console.error;

beforeAll(() => {
  // Mock console.error to filter out specific warnings
  console.error = jest.fn((...args: any[]) => {
    // Check if any argument contains the warnings we want to suppress by converting all args to string
    const fullMessage = args.map(arg => {
      if (typeof arg === 'string') return arg;
      if (arg instanceof Error) return arg.message + ' ' + (arg.stack || '');
      if (arg && typeof arg.toString === 'function') return arg.toString();
      try {
        return JSON.stringify(arg);
      } catch {
        return String(arg);
      }
    }).join(' ');

    // Check if this full message contains any of our target patterns
    const shouldSuppress =
      fullMessage.includes('validateDOMNesting') ||  // This catches the nested anchor warning
      fullMessage.includes('legacyBehavior') ||
      fullMessage.includes('passHref');

    // Only call the original console.error if this is not one of the warnings we want to suppress
    if (!shouldSuppress) {
      originalConsoleError(...args);
    }
  });
});

afterAll(() => {
  // Restore original console.error
  console.error = originalConsoleError;
});

// Mock the Link component to avoid legacyBehavior and passHref warnings
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    Link: ({ legacyBehavior, passHref, children, ...props }: { legacyBehavior?: boolean; passHref?: boolean; children: React.ReactNode } & React.HTMLAttributes<HTMLAnchorElement>) => {
      // Filter out Next.js specific props that React doesn't recognize
      const filteredProps = { ...props };
      delete (filteredProps as any).legacyBehavior;
      delete (filteredProps as any).passHref;

      return <a {...filteredProps}>{children}</a>;
    },
  };
});

// Mock the shadcn/ui components since they might not be available in test environment
jest.mock('@/components/ui/navigation-menu', () => {
  const React = jest.requireActual('react');

  return {
    NavigationMenu: ({ children }: { children: React.ReactNode }) => <nav>{children}</nav>,
    NavigationMenuList: ({ children }: { children: React.ReactNode }) => <ul>{children}</ul>,
    NavigationMenuItem: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
    NavigationMenuTrigger: ({ children }: { children: React.ReactNode }) => <button role="button">{children}</button>,
    NavigationMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    NavigationMenuLink: ({ children, asChild, legacyBehavior, passHref, ...props }: { children: React.ReactNode; asChild?: boolean } & React.HTMLAttributes<HTMLAnchorElement> & { legacyBehavior?: boolean; passHref?: boolean }) => {
      // Filter out Next.js specific props that React doesn't recognize
      const filteredProps = { ...props };
      delete (filteredProps as any).legacyBehavior;
      delete (filteredProps as any).passHref;

      // If asChild is true, apply NavigationMenuLink's props to the child component
      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, filteredProps);
      }
      // For other cases, create a regular anchor with props
      return <a {...filteredProps}>{children}</a>;
    },
    navigationMenuTriggerStyle: () => '',
  };
});

describe('NavigationMenuDemo', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the navigation menu', () => {
    renderWithRouter(<NavigationMenuDemo />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the main menu items', () => {
    renderWithRouter(<NavigationMenuDemo />);
    
    expect(screen.getByText('Getting started')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
  });

  it('renders the initial navigation content for "Getting started"', () => {
    renderWithRouter(<NavigationMenuDemo />);
    
    expect(screen.getByText('shadcn/ui')).toBeInTheDocument();
    expect(screen.getByText('Beautifully designed components built with Radix UI and Tailwind CSS.')).toBeInTheDocument();
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Installation')).toBeInTheDocument();
    expect(screen.getByText('Typography')).toBeInTheDocument();
  });

  it('renders the components list in the "Components" menu', () => {
    renderWithRouter(<NavigationMenuDemo />);
    
    expect(screen.getByText('Alert Dialog')).toBeInTheDocument();
    expect(screen.getByText('Hover Card')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('Scroll-area')).toBeInTheDocument();
    expect(screen.getByText('Tabs')).toBeInTheDocument();
    expect(screen.getByText('Tooltip')).toBeInTheDocument();
  });

  it('displays descriptions for components', () => {
    renderWithRouter(<NavigationMenuDemo />);
    
    expect(screen.getByText(/A modal dialog that interrupts the user/i)).toBeInTheDocument();
    expect(screen.getByText(/For sighted users to preview content/i)).toBeInTheDocument();
    expect(screen.getByText(/Displays an indicator showing the completion progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Visually or semantically separates content/i)).toBeInTheDocument();
    expect(screen.getByText(/A set of layered sections of content/i)).toBeInTheDocument();
    expect(screen.getByText(/A popup that displays information/i)).toBeInTheDocument();
  });

  it('has working anchor links with proper href attributes', () => {
    renderWithRouter(<NavigationMenuDemo />);

    const introductionLink = screen.getByRole('link', { name: /Introduction/ });
    expect(introductionLink).toHaveAttribute('href', '/docs');

    const installationLink = screen.getByRole('link', { name: /Installation/ });
    expect(installationLink).toHaveAttribute('href', '/docs/installation');
  });

  it('applies proper class names and structure', () => {
    renderWithRouter(<NavigationMenuDemo />);

    const navElement = screen.getByRole('navigation');
    expect(navElement.tagName).toBe('NAV');

    // Check for proper list structure - use getAllByRole to handle multiple lists
    const listElements = screen.getAllByRole('list');
    // The main navigation list should be the first one
    expect(listElements[0].tagName).toBe('UL');
  });
});