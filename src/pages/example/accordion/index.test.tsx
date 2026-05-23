import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import AccordionDemo from './index';
import { useTranslation } from 'react-i18next';

// Mock the UI components since we're testing the parent component
jest.mock('@/components/ui/accordion', () => {
  const AccordionPrimitive = jest.requireActual('@radix-ui/react-accordion');

  return {
    Accordion: ({ children, collapsible, ...props }: { children: React.ReactNode; className?: string; type?: string; collapsible?: boolean }) => (
      <div data-testid="accordion" {...(collapsible ? { 'data-collapsible': 'true' } : {})} {...props}>
        {children}
      </div>
    ),
    AccordionContent: ({ children, ...props }: { children: React.ReactNode }) => (
      <div data-testid="accordion-content" {...props}>
        {children}
      </div>
    ),
    AccordionItem: ({ children, value, ...props }: { children: React.ReactNode; value: string }) => (
      <div data-testid="accordion-item" data-value={value} {...props} key={value}>
        {children}
      </div>
    ),
    AccordionTrigger: ({ children, ...props }: { children: React.ReactNode }) => (
      <button data-testid="accordion-trigger" type="button" {...props}>
        {children}
      </button>
    ),
  };
});

// Mock the react-i18next useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const mockT = jest.fn((key: string, options?: { returnObjects: boolean }) => {
  if (options?.returnObjects && key === 'example.accordion') {
    // Return mock accordion items when translation key has returnObjects: true
    return [
      { title: 'First Item', content: 'Content of first item' },
      { title: 'Second Item', content: 'Content of second item' },
      { title: 'Third Item', content: 'Content of third item' },
    ];
  }
  return key; // Return the key as translation if not a special case
});

const mockedUseTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>;

describe('AccordionDemo', () => {
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

  it('renders without crashing', () => {
    render(<AccordionDemo />);
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
  });

  it('renders the correct number of accordion items', () => {
    render(<AccordionDemo />);
    
    const accordionItems = screen.getAllByTestId('accordion-item');
    expect(accordionItems).toHaveLength(3); // Based on our mock data
  });

  it('renders accordion titles correctly', () => {
    render(<AccordionDemo />);
    
    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
    expect(screen.getByText('Third Item')).toBeInTheDocument();
  });

  it('renders accordion content correctly', () => {
    render(<AccordionDemo />);
    
    expect(screen.getByText('Content of first item')).toBeInTheDocument();
    expect(screen.getByText('Content of second item')).toBeInTheDocument();
    expect(screen.getByText('Content of third item')).toBeInTheDocument();
  });

  it('assigns correct values to accordion items', () => {
    render(<AccordionDemo />);
    
    const accordionItems = screen.getAllByTestId('accordion-item');
    expect(accordionItems[0]).toHaveAttribute('data-value', 'item-0');
    expect(accordionItems[1]).toHaveAttribute('data-value', 'item-1');
    expect(accordionItems[2]).toHaveAttribute('data-value', 'item-2');
  });

  it('has the correct accordion type and collapsible properties', () => {
    render(<AccordionDemo />);

    const accordionElement = screen.getByTestId('accordion');
    expect(accordionElement).toHaveAttribute('type', 'single');
    // The collapsible prop should be reflected in our mock as a data attribute
    expect(accordionElement).toHaveAttribute('data-collapsible', 'true');
  });

  it('maps over all accordion items from translation', () => {
    render(<AccordionDemo />);
    
    const triggers = screen.getAllByTestId('accordion-trigger');
    expect(triggers).toHaveLength(3); // Should have 3 trigger buttons
    
    const contents = screen.getAllByTestId('accordion-content');
    expect(contents).toHaveLength(3); // Should have 3 content sections
  });

  it('calls translation with correct key and options', () => {
    render(<AccordionDemo />);
    
    // Verify that translation was called with the correct key and returnObjects option
    expect(mockT).toHaveBeenCalledWith('example.accordion', { returnObjects: true });
  });
});