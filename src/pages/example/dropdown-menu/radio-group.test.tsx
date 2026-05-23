import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from '@jest/globals';
import DropdownMenuRadioGroupDemo from './radio-group';

describe('DropdownMenuRadioGroupDemo', () => {
  it('renders the dropdown trigger button', () => {
    render(<DropdownMenuRadioGroupDemo />);
    const button = screen.getByRole('button', { name: /open/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Open');
  });

  it('initially has "bottom" selected as default value', async () => {
    const user = userEvent.setup();
    render(<DropdownMenuRadioGroupDemo />);

    // Click the dropdown trigger to open the menu
    const triggerButton = screen.getByRole('button', { name: /open/i });
    await user.click(triggerButton);

    // Wait for the dropdown content to appear
    await waitFor(() => {
      expect(screen.getByText('Panel Position')).toBeInTheDocument();
    });

    // Check that "bottom" option appears as selected
    const bottomOption = screen.getByRole('menuitemradio', { name: 'Bottom' });
    expect(bottomOption).toBeInTheDocument();
    // Check that it's selected by default
    expect(bottomOption).toHaveAttribute('data-state', 'checked');
  });

  it('allows changing the selected radio option', async () => {
    const user = userEvent.setup();
    render(<DropdownMenuRadioGroupDemo />);

    // Click the dropdown trigger to open the menu
    const triggerButton = screen.getByRole('button', { name: /open/i });
    await user.click(triggerButton);

    // Wait for the dropdown content to appear
    await waitFor(() => {
      expect(screen.getByText('Panel Position')).toBeInTheDocument();
    });

    // Check initial state
    const topOption = screen.getByRole('menuitemradio', { name: 'Top' });
    const bottomOption = screen.getByRole('menuitemradio', { name: 'Bottom' });
    const rightOption = screen.getByRole('menuitemradio', { name: 'Right' });

    // Initially "bottom" should be selected
    expect(bottomOption).toHaveAttribute('data-state', 'checked');

    // Click on "Top" option
    await user.click(topOption);

    // Wait for state update
    await waitFor(() => {
      expect(topOption).toHaveAttribute('data-state', 'checked');
      expect(bottomOption).not.toHaveAttribute('data-state', 'checked');
    });
  });

  it('displays all radio options correctly', async () => {
    const user = userEvent.setup();
    render(<DropdownMenuRadioGroupDemo />);

    // Click the dropdown trigger to open the menu
    const triggerButton = screen.getByRole('button', { name: /open/i });
    await user.click(triggerButton);

    // Wait for the dropdown content to appear before checking
    await waitFor(() => {
      expect(screen.getByText('Panel Position')).toBeInTheDocument();
    });

    // All options should be present
    expect(screen.getByText('Top')).toBeInTheDocument();
    expect(screen.getByText('Bottom')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('renders the panel position label', async () => {
    const user = userEvent.setup();
    render(<DropdownMenuRadioGroupDemo />);

    // Click the dropdown trigger to open the menu
    const triggerButton = screen.getByRole('button', { name: /open/i });
    await user.click(triggerButton);

    // Wait for the dropdown content to appear
    await waitFor(() => {
      expect(screen.getByText('Panel Position')).toBeInTheDocument();
    });
  });

});