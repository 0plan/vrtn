import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import HoverCardDemo from './demo';

describe('HoverCardDemo', () => {
  const mockUser = userEvent.setup({ delay: null });

  test('renders trigger button with correct text', () => {
    render(<HoverCardDemo />);
    
    const triggerButton = screen.getByRole('button', { name: /@nextjs/i });
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).toHaveTextContent('@nextjs');
  });

  test('shows hover card content when mouse enters the trigger', async () => {
    render(<HoverCardDemo />);
    
    const triggerButton = screen.getByRole('button', { name: /@nextjs/i });

    // Use act to handle state updates properly
    await act(async () => {
      await mockUser.hover(triggerButton);
    });

    // Wait for the hover card content to appear
    await waitFor(
      () => {
        expect(screen.getByText(/The React Framework – created and maintained by @vercel/i)).toBeInTheDocument();
      },
      { timeout: 15000 }
    );

    // Additional assertions on the visible content
    // Use getByRole to find the header in the hover card specifically
    expect(screen.getByRole('heading', { name: /@nextjs/i })).toBeInTheDocument();
    expect(screen.getByText('The React Framework – created and maintained by @vercel.')).toBeInTheDocument();
    expect(screen.getByText('Joined December 2021')).toBeInTheDocument();
  });

  test('contains avatar with correct fallback text', async () => {
    render(<HoverCardDemo />);
    
    const triggerButton = screen.getByRole('button', { name: /@nextjs/i });
    
    await act(async () => {
      await mockUser.hover(triggerButton);
    });
    
    await waitFor(
      () => {
        expect(screen.getByText('VC')).toBeInTheDocument();
      },
      { timeout: 15000 }
    );
  });

  test('contains calendar days icon in hover content', async () => {
    render(<HoverCardDemo />);

    const triggerButton = screen.getByRole('button', { name: /@nextjs/i });

    await act(async () => {
      await mockUser.hover(triggerButton);
    });

    await waitFor(
      () => {
        // Look for the calendar days icon - it has specific classes from the DOM output
        const calendarIcon = document.querySelector('svg.lucide-calendar-days');
        expect(calendarIcon).toBeInTheDocument();
        expect(calendarIcon).toHaveClass('opacity-70');
        expect(calendarIcon).toHaveClass('h-4');
      },
      { timeout: 15000 }
    );
  });

  test('hover card content has correct width class', async () => {
    render(<HoverCardDemo />);
    
    const triggerButton = screen.getByRole('button', { name: /@nextjs/i });
    
    await act(async () => {
      await mockUser.hover(triggerButton);
    });
    
    await waitFor(
      () => {
        // Find the hover card content div by looking for the element with class w-80
        const contentDiv = document.querySelector('[data-radix-popper-content-wrapper] > div');
        expect(contentDiv).toHaveClass('w-80');
      },
      { timeout: 15000 }
    );
  });

  test('hover card hides when mouse leaves', async () => {
    render(<HoverCardDemo />);
    
    const triggerButton = screen.getByRole('button', { name: /@nextjs/i });

    // Show the hover card
    await act(async () => {
      await mockUser.hover(triggerButton);
    });
    
    // Wait for card to show
    await waitFor(
      () => {
        expect(screen.getByText(/The React Framework – created and maintained by @vercel/i)).toBeInTheDocument();
      },
      { timeout: 15000 }
    );

    // Unhover to hide the card
    await act(async () => {
      await mockUser.unhover(triggerButton);
    });

    // The content should eventually disappear
    await waitFor(
      () => {
        expect(screen.queryByText(/The React Framework – created and maintained by @vercel/i)).not.toBeInTheDocument();
      },
      { timeout: 15000 }
    );
  });
});