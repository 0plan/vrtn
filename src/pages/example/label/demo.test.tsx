import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabelDemo from './demo';

describe('LabelDemo', () => {
  it('renders the checkbox and label', () => {
    render(<LabelDemo />);
    
    // Check that the checkbox exists
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    
    // Check that the label exists and has the correct text
    const label = screen.getByText('Accept terms and conditions');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'terms');
  });

  it('associates the label with the checkbox', () => {
    render(<LabelDemo />);
    
    // Find the checkbox and label
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Accept terms and conditions');
    
    // Verify the label is associated with the checkbox
    expect(label).toHaveAttribute('for', 'terms');
    expect(checkbox).toHaveAttribute('id', 'terms');
  });

  it('allows checkbox to be checked via label click', async () => {
    render(<LabelDemo />);
    
    const user = userEvent.setup();
    
    // Find the checkbox and label
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Accept terms and conditions');
    
    // Initially, checkbox should be unchecked
    expect(checkbox).not.toBeChecked();
    
    // Click the label (which should toggle the checkbox)
    await user.click(label);
    
    // Check that the checkbox is now checked
    expect(checkbox).toBeChecked();
  });

  it('allows checkbox to be toggled directly', async () => {
    render(<LabelDemo />);
    
    const user = userEvent.setup();
    
    // Find the checkbox
    const checkbox = screen.getByRole('checkbox');
    
    // Initially, checkbox should be unchecked
    expect(checkbox).not.toBeChecked();
    
    // Click the checkbox directly
    await user.click(checkbox);
    
    // Check that the checkbox is now checked
    expect(checkbox).toBeChecked();
    
    // Click again to uncheck
    await user.click(checkbox);
    
    // Check that the checkbox is now unchecked
    expect(checkbox).not.toBeChecked();
  });

  it('has proper accessibility attributes', () => {
    render(<LabelDemo />);
    
    // Check that the checkbox has proper ID
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'terms');
    
    // Check that the label has proper htmlFor attribute
    const label = screen.getByText('Accept terms and conditions');
    expect(label).toHaveAttribute('for', 'terms');
  });

  it('renders with proper class names and structure', () => {
    render(<LabelDemo />);

    // Check that the flex container exists with proper classes
    const flexContainer = screen.getByText('Accept terms and conditions').closest('div');
    expect(flexContainer).toHaveClass('flex', 'items-center', 'space-x-2');
  });
});