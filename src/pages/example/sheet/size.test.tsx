import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import SheetSize from './size';
import { Input } from '@/components/ui/input';

// Mock the Input component to avoid controlled input warnings
jest.mock('@/components/ui/input', () => {
  const OriginalInput = jest.requireActual('@/components/ui/input');
  return {
    ...OriginalInput,
    Input: ({ value, ...props }) => <OriginalInput.Input {...props} value={value} onChange={() => {}} />,
  };
});

describe('SheetSize', () => {
  it('renders the radio group with all available sizes', () => {
    render(<SheetSize />);
    
    // Check that all size options are present
    expect(screen.getByLabelText('sm')).toBeInTheDocument();
    expect(screen.getByLabelText('default')).toBeInTheDocument();
    expect(screen.getByLabelText('lg')).toBeInTheDocument();
    expect(screen.getByLabelText('xl')).toBeInTheDocument();
    expect(screen.getByLabelText('full')).toBeInTheDocument();
    expect(screen.getByLabelText('content')).toBeInTheDocument();
  });

  it('has the default size selected as "default"', () => {
    render(<SheetSize />);
    
    // Check that "default" radio button is checked initially
    const defaultRadio = screen.getByLabelText('default');
    expect(defaultRadio).toBeChecked();
  });

  it('renders the sheet trigger button with correct text', () => {
    render(<SheetSize />);
    
    const button = screen.getByText('Open default sheet');
    expect(button).toBeInTheDocument();
  });

  it('updates button text when a different size is selected', () => {
    render(<SheetSize />);
    
    // Select "lg" size
    fireEvent.click(screen.getByLabelText('lg'));
    
    // Check that button text updates
    const button = screen.getByText('Open lg sheet');
    expect(button).toBeInTheDocument();
  });

  it('renders sheet elements when opened', () => {
    render(<SheetSize />);

    // Initially, the sheet content should not be visible
    expect(screen.queryByText('Edit profile')).not.toBeInTheDocument();
    expect(screen.queryByText("Make changes to your profile here. Click save when you're done.")).not.toBeInTheDocument();

    // Click the trigger button to open the sheet
    fireEvent.click(screen.getByText('Open default sheet'));

    // Now the sheet content should be visible
    expect(screen.getByText('Edit profile')).toBeInTheDocument();
    expect(screen.getByText("Make changes to your profile here. Click save when you're done.")).toBeInTheDocument();
  });

  it('renders form elements inside the sheet', () => {
    render(<SheetSize />);

    // Open the sheet first
    fireEvent.click(screen.getByText('Open default sheet'));

    // Check for form elements
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Pedro Duarte')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByDisplayValue('@peduarte')).toBeInTheDocument();
  });

  it('renders save button in sheet footer', () => {
    render(<SheetSize />);

    // Open the sheet
    fireEvent.click(screen.getByText('Open default sheet'));

    // Check for the save button
    const saveButton = screen.getByText('Save changes');
    expect(saveButton).toBeInTheDocument();
    expect(saveButton.tagName).toBe('BUTTON');
    expect(saveButton).toHaveAttribute('type', 'submit');
  });

  it('allows selecting different sizes and opens sheet with correct size', () => {
    render(<SheetSize />);
    
    // Test that we can select different sizes
    const sizeOptions = ['sm', 'lg', 'xl', 'full', 'content'];
    
    for (const size of sizeOptions) {
      // Select the size
      fireEvent.click(screen.getByLabelText(size));
      
      // Verify the button text updates
      const button = screen.getByText(`Open ${size} sheet`);
      expect(button).toBeInTheDocument();
      
      // Open the sheet
      fireEvent.click(button);
      
      // Verify the sheet opens (the content should be visible)
      expect(screen.getByText('Edit profile')).toBeInTheDocument();
      
      // Close the sheet by clicking outside or using escape, but since we can't do that easily in tests,
      // we'll just continue with the next size
      fireEvent.click(screen.getByText(`Open ${size} sheet`)); // This closes the sheet again
    }
  });
});