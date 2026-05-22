import { render, screen, fireEvent } from '@testing-library/react';
import RadioGroupDemo from './demo';

describe('RadioGroupDemo', () => {
  it('renders the radio group with all options', () => {
    render(<RadioGroupDemo />);
    
    // Check that all radio options are present
    expect(screen.getByLabelText('Default')).toBeInTheDocument();
    expect(screen.getByLabelText('Comfortable')).toBeInTheDocument();
    expect(screen.getByLabelText('Compact')).toBeInTheDocument();
    
    // Check that all radio inputs are present
    expect(screen.getByRole('radio', { name: 'Default' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Comfortable' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Compact' })).toBeInTheDocument();
    
    // Check that the radio group has the correct default value
    const comfortableRadio = screen.getByLabelText('Comfortable');
    expect(comfortableRadio).toBeChecked();
    
    // The other options should not be checked
    expect(screen.getByLabelText('Default')).not.toBeChecked();
    expect(screen.getByLabelText('Compact')).not.toBeChecked();
  });

  it('allows selecting different radio options', () => {
    render(<RadioGroupDemo />);
    
    // Initially comfortable should be selected
    expect(screen.getByLabelText('Comfortable')).toBeChecked();
    
    // Select the 'Default' option
    fireEvent.click(screen.getByLabelText('Default'));
    expect(screen.getByLabelText('Default')).toBeChecked();
    expect(screen.getByLabelText('Comfortable')).not.toBeChecked();
    expect(screen.getByLabelText('Compact')).not.toBeChecked();
    
    // Select the 'Compact' option
    fireEvent.click(screen.getByLabelText('Compact'));
    expect(screen.getByLabelText('Compact')).toBeChecked();
    expect(screen.getByLabelText('Default')).not.toBeChecked();
    expect(screen.getByLabelText('Comfortable')).not.toBeChecked();
  });

  it('has proper accessibility attributes', () => {
    render(<RadioGroupDemo />);

    // Check that each radio button has the proper role attribute
    const defaultRadio = screen.getByLabelText('Default');
    const comfortableRadio = screen.getByLabelText('Comfortable');
    const compactRadio = screen.getByLabelText('Compact');

    expect(defaultRadio).toHaveAttribute('role', 'radio');
    expect(comfortableRadio).toHaveAttribute('role', 'radio');
    expect(compactRadio).toHaveAttribute('role', 'radio');

    // Check that labels are properly associated with inputs
    expect(screen.getByText('Default')).toHaveAttribute('for', 'r1');
    expect(screen.getByText('Comfortable')).toHaveAttribute('for', 'r2');
    expect(screen.getByText('Compact')).toHaveAttribute('for', 'r3');

    // Check that the checked state is properly reflected
    expect(comfortableRadio).toHaveAttribute('aria-checked', 'true');
    expect(defaultRadio).toHaveAttribute('aria-checked', 'false');
    expect(compactRadio).toHaveAttribute('aria-checked', 'false');
  });
});