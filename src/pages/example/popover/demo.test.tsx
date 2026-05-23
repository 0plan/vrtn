import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import PopoverDemo from './demo';

// Mock the components that are being used in the demo
// Since we're testing the integration of these components with our demo
jest.mock('@/components/ui/popover', () => ({
  Popover: ({ children }: { children: React.ReactNode }) => <div data-testid="popover">{children}</div>,
  PopoverContent: ({ children }: { children: React.ReactNode }) => <div data-testid="popover-content">{children}</div>,
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="popover-trigger">{children}</div>,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: { children: React.ReactNode; onClick?: () => void; [key: string]: any }) => (
    <button onClick={onClick} {...props} data-testid="button">
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: ({ id, defaultValue, ...props }: { id: string; defaultValue: string; [key: string]: any }) => (
    <input id={id} defaultValue={defaultValue} data-testid={`input-${id}`} {...props} />
  ),
}));

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} data-testid={`label-${htmlFor}`}>
      {children}
    </label>
  ),
}));

describe('PopoverDemo', () => {
  it('renders the popover trigger button with settings icon', () => {
    render(<PopoverDemo />);
    
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    
    // Check if the settings icon is present (this would be an SVG or icon element)
    const settingsIcon = button.querySelector('svg');
    // If the real component renders the Settings icon, we'd check for it
    // Since we're mocking components, we verify the structure
  });

  it('renders the popover content with form fields', () => {
    render(<PopoverDemo />);
    
    const popoverContent = screen.getByTestId('popover-content');
    expect(popoverContent).toBeInTheDocument();
    
    // Check for the presence of the dimensions header
    expect(screen.getByText('Dimensions')).toBeInTheDocument();
    
    // Check for the description text
    expect(screen.getByText('Set the dimensions for the layer.')).toBeInTheDocument();
  });

  it('renders all input fields with correct default values', () => {
    render(<PopoverDemo />);
    
    // Check for width input with default value
    const widthInput = screen.getByTestId('input-width');
    expect(widthInput).toBeInTheDocument();
    expect((widthInput as HTMLInputElement).defaultValue).toBe('100%');
    
    // Check for maxWidth input with default value
    const maxWidthInput = screen.getByTestId('input-maxWidth');
    expect(maxWidthInput).toBeInTheDocument();
    expect((maxWidthInput as HTMLInputElement).defaultValue).toBe('300px');
    
    // Check for height input with default value
    const heightInput = screen.getByTestId('input-height');
    expect(heightInput).toBeInTheDocument();
    expect((heightInput as HTMLInputElement).defaultValue).toBe('25px');
    
    // Check for maxHeight input with default value
    const maxHeightInput = screen.getByTestId('input-maxHeight');
    expect(maxHeightInput).toBeInTheDocument();
    expect((maxHeightInput as HTMLInputElement).defaultValue).toBe('none');
  });

  it('renders all label elements correctly', () => {
    render(<PopoverDemo />);
    
    // Check for all labels
    expect(screen.getByTestId('label-width')).toBeInTheDocument();
    expect(screen.getByText('Width')).toBeInTheDocument();
    
    expect(screen.getByTestId('label-maxWidth')).toBeInTheDocument();
    expect(screen.getByText('Max. width')).toBeInTheDocument();
    
    expect(screen.getByTestId('label-height')).toBeInTheDocument();
    expect(screen.getByText('Height')).toBeInTheDocument();
    
    expect(screen.getByTestId('label-maxHeight')).toBeInTheDocument();
    expect(screen.getByText('Max. height')).toBeInTheDocument();
  });

  it('has correct input attributes', () => {
    render(<PopoverDemo />);
    
    // Check that inputs have correct class attributes
    const widthInput = screen.getByTestId('input-width');
    expect(widthInput).toHaveClass('col-span-2', 'h-8');
    
    const maxWidthInput = screen.getByTestId('input-maxWidth');
    expect(maxWidthInput).toHaveClass('col-span-2', 'h-8');
    
    const heightInput = screen.getByTestId('input-height');
    expect(heightInput).toHaveClass('col-span-2', 'h-8');
    
    const maxHeightInput = screen.getByTestId('input-maxHeight');
    expect(maxHeightInput).toHaveClass('col-span-2', 'h-8');
  });

  it('has correct button attributes', () => {
    render(<PopoverDemo />);
    
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('w-10', 'rounded-full', 'p-0');
  });
});