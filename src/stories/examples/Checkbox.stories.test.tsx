import { render, screen, fireEvent } from '@testing-library/react';
import { Default, Disabled } from './Checkbox.stories';
import { Checkbox } from '@/components/ui/checkbox';

// Correctly implement the story template for testing
const CheckboxTemplate = ({ disabled }: { disabled?: boolean }) => (
  <div className="flex items-center space-x-2">
    <Checkbox id="terms" disabled={disabled} />
    <label
      htmlFor="terms"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      Accept terms and conditions
    </label>
  </div>
);

describe('Checkbox Stories', () => {
  it('renders the Default story correctly', () => {
    render(<CheckboxTemplate {...Default.args} />);

    // Check that the checkbox and label are present
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeDisabled();

    const label = screen.getByText('Accept terms and conditions');
    expect(label).toBeInTheDocument();
  });

  it('renders the Disabled story correctly', () => {
    render(<CheckboxTemplate {...Disabled.args} />);

    // Check that the checkbox is disabled
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeDisabled();

    const label = screen.getByText('Accept terms and conditions');
    expect(label).toBeInTheDocument();
  });

  it('allows changing the checkbox state when not disabled', () => {
    render(<CheckboxTemplate {...Default.args} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('does not allow changing the checkbox state when disabled', () => {
    render(<CheckboxTemplate {...Disabled.args} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeDisabled();

    // Attempting to click should not change the state
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('applies the correct props from story args', () => {
    // Test with custom args
    render(<CheckboxTemplate disabled={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});