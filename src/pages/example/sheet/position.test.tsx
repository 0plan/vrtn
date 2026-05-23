import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SheetPosition from './position';
import { describe, it, expect } from '@jest/globals';

describe('SheetPosition Component', () => {
  it('renders the radio group with all position options', () => {
    render(<SheetPosition />);

    // Check that all four position options are present
    expect(screen.getByLabelText('top')).toBeInTheDocument();
    expect(screen.getByLabelText('right')).toBeInTheDocument();
    expect(screen.getByLabelText('bottom')).toBeInTheDocument();
    expect(screen.getByLabelText('left')).toBeInTheDocument();

    // Check that the radio buttons exist
    expect(screen.getByRole('radio', { name: 'top' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'right' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'bottom' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'left' })).toBeInTheDocument();
  });

  it('has the correct initial state with "right" selected by default', () => {
    render(<SheetPosition />);

    const rightRadio = screen.getByRole('radio', { name: 'right' });
    expect(rightRadio).toBeChecked();

    // Check that the button text includes "right"
    const openButton = screen.getByRole('button', { name: /Open right sheet/ });
    expect(openButton).toBeInTheDocument();
  });

  it('updates the position when a different radio option is selected', () => {
    render(<SheetPosition />);

    // Initially "right" should be selected
    let openButton = screen.getByRole('button', { name: /Open right sheet/ });
    expect(openButton).toBeInTheDocument();

    // Select "top" radio button
    const topRadio = screen.getByLabelText('top');
    fireEvent.click(topRadio);

    // Button text should now include "top"
    openButton = screen.getByRole('button', { name: /Open top sheet/ });
    expect(openButton).toBeInTheDocument();
  });

  it('changes button text when different positions are selected', () => {
    render(<SheetPosition />);

    // Test each position
    const positions = ['top', 'right', 'bottom', 'left'];

    positions.forEach(position => {
      const radio = screen.getByLabelText(position);
      fireEvent.click(radio);

      const button = screen.getByRole('button', { name: new RegExp(`Open ${position} sheet`, 'i') });
      expect(button).toBeInTheDocument();
    });
  });

  it('renders the sheet trigger button', () => {
    render(<SheetPosition />);

    const triggerButton = screen.getByRole('button', { name: /Open.*sheet/ });
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).toHaveTextContent(/Open.*sheet/);
  });

  it('displays all form elements within the sheet content after opening', async () => {
    render(<SheetPosition />);

    // Click the sheet trigger button to open the sheet
    const triggerButton = screen.getByRole('button', { name: /Open.*sheet/ });
    fireEvent.click(triggerButton);

    // Wait for the sheet content to appear in the DOM
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    // Find the input fields that should be present in the sheet
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();

    // Check that the save button is present in the footer
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it('has the correct initial sheet title and description after opening', async () => {
    render(<SheetPosition />);

    // Click the sheet trigger button to open the sheet
    const triggerButton = screen.getByRole('button', { name: /Open.*sheet/ });
    fireEvent.click(triggerButton);

    // Wait for the sheet content to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText('Edit profile')).toBeInTheDocument();
    });

    expect(screen.getByText('Edit profile')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Make changes to your profile here. Click save when you're done."
      )
    ).toBeInTheDocument();
  });
});