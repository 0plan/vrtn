import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import CommandDialogDemo from './dialog';

// Mock the keyboard event for the cmd+j shortcut
const mockKeyboardEvent = (key: string, metaKey = true) => {
  return new KeyboardEvent('keydown', {
    key,
    metaKey,
    bubbles: true,
    cancelable: true,
  });
};

describe('CommandDialogDemo', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the keyboard shortcut instruction', () => {
    render(<CommandDialogDemo />);

    expect(screen.getByText(/Press/)).toBeInTheDocument();
    // Use getByTestId or find the kbd element that contains the shortcut
    const kbdElement = screen.getByText('J');
    expect(kbdElement).toBeInTheDocument();
    // Check if the parent kbd element contains both the ⌘ and J
    expect(kbdElement.parentElement).toHaveTextContent('⌘J');
  });

  it('initially has the dialog closed', () => {
    render(<CommandDialogDemo />);

    // The command dialog should not be in the document initially
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the dialog when cmd+j is pressed', async () => {
    render(<CommandDialogDemo />);

    // Use act to wrap state updates triggered by keyboard event
    await act(async () => {
      // Simulate the keyboard event
      const keyboardEvent = mockKeyboardEvent('j', true);
      document.dispatchEvent(keyboardEvent);
    });

    // Wait for the dialog to appear
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('closes the dialog when cmd+j is pressed twice', async () => {
    render(<CommandDialogDemo />);

    // Open the dialog
    await act(async () => {
      const keyboardEvent = mockKeyboardEvent('j', true);
      document.dispatchEvent(keyboardEvent);
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Close the dialog
    await act(async () => {
      const keyboardEvent = mockKeyboardEvent('j', true);
      document.dispatchEvent(keyboardEvent);
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('does not open when cmd+j is pressed if metaKey is false', async () => {
    render(<CommandDialogDemo />);

    await act(async () => {
      const keyboardEvent = mockKeyboardEvent('j', false);
      document.dispatchEvent(keyboardEvent);
    });

    // Wait a bit to make sure the dialog doesn't open
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('does not open when other keys with cmd are pressed', async () => {
    render(<CommandDialogDemo />);

    await act(async () => {
      const keyboardEvent = mockKeyboardEvent('k', true);
      document.dispatchEvent(keyboardEvent);
    });

    // Wait a bit to make sure the dialog doesn't open
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('displays the command input field when open', async () => {
    render(<CommandDialogDemo />);

    // Open the dialog
    await act(async () => {
      const keyboardEvent = mockKeyboardEvent('j', true);
      document.dispatchEvent(keyboardEvent);
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Type a command or search...')).toBeInTheDocument();
    });
  });

  it('displays the command list when open', async () => {
    render(<CommandDialogDemo />);

    // Open the dialog
    await act(async () => {
      const keyboardEvent = mockKeyboardEvent('j', true);
      document.dispatchEvent(keyboardEvent);
    });

    // Wait for the dialog to be in the document first
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Check that the command list is displayed (with suggestions)
    // Since there's no input yet, the suggestions will be visible
    expect(screen.getByText('Suggestions')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Search Emoji')).toBeInTheDocument();
    expect(screen.getByText('Calculator')).toBeInTheDocument();
  });

  it('displays the suggestion items', async () => {
    render(<CommandDialogDemo />);

    // Open the dialog
    await act(async () => {
      const keyboardEvent = mockKeyboardEvent('j', true);
      document.dispatchEvent(keyboardEvent);
    });

    await waitFor(() => {
      expect(screen.getByText('Calendar')).toBeInTheDocument();
      expect(screen.getByText('Search Emoji')).toBeInTheDocument();
      expect(screen.getByText('Calculator')).toBeInTheDocument();
    });
  });

  it('displays the settings group items', async () => {
    render(<CommandDialogDemo />);

    // Open the dialog
    await act(async () => {
      const keyboardEvent = mockKeyboardEvent('j', true);
      document.dispatchEvent(keyboardEvent);
    });

    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Billing')).toBeInTheDocument();
    });

    // Use getAllByText to get all 'Settings' elements and verify at least one exists
    const settingsElements = screen.getAllByText('Settings');
    expect(settingsElements.length).toBeGreaterThan(0);
  });

  it('displays the command shortcuts', async () => {
    render(<CommandDialogDemo />);

    // Open the dialog
    await act(async () => {
      const keyboardEvent = mockKeyboardEvent('j', true);
      document.dispatchEvent(keyboardEvent);
    });

    await waitFor(() => {
      expect(screen.getByText('⌘P')).toBeInTheDocument();
      expect(screen.getByText('⌘B')).toBeInTheDocument();
      expect(screen.getByText('⌘S')).toBeInTheDocument();
    });
  });

  it('displays the group headings', async () => {
    render(<CommandDialogDemo />);

    // Open the dialog
    await act(async () => {
      const keyboardEvent = mockKeyboardEvent('j', true);
      document.dispatchEvent(keyboardEvent);
    });

    await waitFor(() => {
      expect(screen.getByText('Suggestions')).toBeInTheDocument();
    });

    // Check for the Settings group heading specifically
    const groupHeadings = screen.getAllByText('Settings');
    // One should be the group heading, and one should be in the list items
    expect(groupHeadings.length).toBeGreaterThan(0);
  });

  it('has proper cleanup of event listeners on unmount', () => {
    const { unmount } = render(<CommandDialogDemo />);

    // Mock the removeEventListener to verify it's called
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});