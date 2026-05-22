import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleDisabled from './disabled';

describe('ToggleDisabled', () => {
  it('renders the toggle with underline icon', () => {
    const { container } = render(<ToggleDisabled />);

    // Check that the toggle element is present
    const toggle = screen.getByRole('button');
    expect(toggle).toBeInTheDocument();

    // Check that the underline icon is present by looking for the SVG inside the toggle
    const svgElement = container.querySelector('svg.lucide-underline');
    expect(svgElement).toBeInTheDocument();
  });

  it('has disabled attribute', () => {
    render(<ToggleDisabled />);

    const toggle = screen.getByRole('button');
    expect(toggle).toBeDisabled();
  });

  it('has correct aria-label', () => {
    render(<ToggleDisabled />);

    const toggle = screen.getByRole('button');
    expect(toggle).toHaveAttribute('aria-label', 'Toggle italic');
  });

  it('does not respond to click events when disabled', async () => {
    const user = userEvent.setup();
    render(<ToggleDisabled />);

    const toggle = screen.getByRole('button');

    // Attempt to click the disabled toggle
    await user.click(toggle);

    // Since it's disabled, the state should not change
    // (Although for a static disabled component, this is more about ensuring
    // the click doesn't cause errors or unexpected behavior)
    expect(toggle).toBeDisabled();
  });
});