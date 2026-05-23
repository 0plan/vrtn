import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SwitchDemo from './demo';

describe('SwitchDemo', () => {
  test('renders switch and label correctly', () => {
    render(<SwitchDemo />);

    // Check that the switch element is present
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();

    // Check that the switch has the correct id
    expect(switchElement).toHaveAttribute('id', 'airplane-mode');

    // Check that the label is present
    const labelElement = screen.getByText('Airplane Mode');
    expect(labelElement).toBeInTheDocument();
  });

  test('allows switching the switch on and off', async () => {
    const user = userEvent.setup();
    render(<SwitchDemo />);

    const switchElement = screen.getByRole('switch');

    // Initially the switch should not be checked
    expect(switchElement).not.toBeChecked();

    // Click to turn on the switch
    await user.click(switchElement);
    expect(switchElement).toBeChecked();

    // Click to turn off the switch
    await user.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  test('clicking the label toggles the switch', async () => {
    const user = userEvent.setup();
    render(<SwitchDemo />);

    const switchElement = screen.getByRole('switch');
    const labelElement = screen.getByText('Airplane Mode');

    // Initially the switch should not be checked
    expect(switchElement).not.toBeChecked();

    // Click the label to toggle the switch
    await user.click(labelElement);
    expect(switchElement).toBeChecked();
  });
});