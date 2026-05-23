import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import DialogDemo from './demo';

describe('DialogDemo', () => {
  it('renders the dialog trigger button', () => {
    render(<DialogDemo />);
    const button = screen.getByRole('button', { name: /Edit Profile/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Edit Profile');
  });

  it('opens the dialog when trigger button is clicked', async () => {
    render(<DialogDemo />);

    // Initially, dialog content should not be visible
    const dialogContent = screen.queryByRole('dialog');
    expect(dialogContent).not.toBeInTheDocument();

    // Click the trigger button
    const triggerButton = screen.getByRole('button', { name: /Edit Profile/i });
    fireEvent.click(triggerButton);

    // Wait for dialog to appear
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  it('displays dialog title and description', async () => {
    render(<DialogDemo />);

    // Open the dialog
    const triggerButton = screen.getByRole('button', { name: /Edit Profile/i });
    fireEvent.click(triggerButton);

    // Wait for dialog to appear and verify content
    await waitFor(() => {
      // Use getByText with exact match to avoid matching the trigger button text
      const title = screen.getByText('Edit profile');
      const description = screen.getByText('Make changes to your profile here. Click save when you\'re done.');
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  it('displays input fields with initial values', async () => {
    render(<DialogDemo />);

    // Open the dialog
    const triggerButton = screen.getByRole('button', { name: /Edit Profile/i });
    fireEvent.click(triggerButton);

    // Wait for dialog to appear and verify inputs
    await waitFor(() => {
      // Use IDs to specifically target the inputs
      const nameInput = screen.getByLabelText('Name');
      expect(nameInput).toBeInTheDocument();
      expect(nameInput).toHaveValue('Pedro Duarte');

      const usernameInput = screen.getByLabelText('Username');
      expect(usernameInput).toBeInTheDocument();
      expect(usernameInput).toHaveValue('@peduarte');
    });
  });

  it('updates state when name input changes', async () => {
    render(<DialogDemo />);

    // Open the dialog
    const triggerButton = screen.getByRole('button', { name: /Edit Profile/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name');

      // Change the name
      fireEvent.change(nameInput, { target: { value: 'New Name' } });

      // Verify the input value changed
      expect(nameInput).toHaveValue('New Name');
    });
  });

  it('updates state when username input changes', async () => {
    render(<DialogDemo />);

    // Open the dialog
    const triggerButton = screen.getByRole('button', { name: /Edit Profile/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      const usernameInput = screen.getByLabelText('Username');

      // Change the username
      fireEvent.change(usernameInput, { target: { value: '@newuser' } });

      // Verify the input value changed
      expect(usernameInput).toHaveValue('@newuser');
    });
  });

  it('displays the save button', async () => {
    render(<DialogDemo />);

    // Open the dialog
    const triggerButton = screen.getByRole('button', { name: /Edit Profile/i });
    fireEvent.click(triggerButton);

    // Wait for dialog to appear and verify save button
    await waitFor(() => {
      const saveButton = screen.getByRole('button', { name: /Save changes/i });
      expect(saveButton).toBeInTheDocument();
      expect(saveButton).toHaveTextContent('Save changes');
    });
  });

  it('applies correct CSS classes to dialog content', async () => {
    render(<DialogDemo />);

    // Open the dialog
    const triggerButton = screen.getByRole('button', { name: /Edit Profile/i });
    fireEvent.click(triggerButton);

    // Wait for dialog and check className
    await waitFor(() => {
      const dialogContent = screen.getByRole('dialog');
      expect(dialogContent).toHaveClass('sm:max-w-[425px]');
    });
  });

  it('has correct grid layout classes', async () => {
    render(<DialogDemo />);

    // Open the dialog
    const triggerButton = screen.getByRole('button', { name: /Edit Profile/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      // Check for grid class on the main dialog content container
      const dialogContent = screen.getByRole('dialog');
      // Look for the grid container inside the dialog
      const gridDiv = dialogContent.querySelector('.grid.gap-4.py-4');
      expect(gridDiv).toBeInTheDocument();

      // Also verify that the individual form rows have the grid classes
      const formRows = dialogContent.querySelectorAll('.grid.grid-cols-4.items-center.gap-4');
      expect(formRows).toHaveLength(2); // Expect two rows (name and username)
    });
  });
});