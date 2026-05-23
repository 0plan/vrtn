import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DefaultCollapsible } from './Collapsible.stories';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

// Mock the lucide-react icon
jest.mock('lucide-react', () => ({
  ChevronsUpDown: ({ className }: { className?: string }) => (
    <span className={className}>chevrons-up-down-icon</span>
  ),
}));

describe('Collapsible Stories', () => {
  it('renders DefaultCollapsible story correctly', () => {
    // Render the DefaultCollapsible story component
    render(<DefaultCollapsible />);

    // Check that the collapsible component is rendered
    const collapsibleElement = screen.getByText('@peduarte starred 3 repositories');
    expect(collapsibleElement).toBeInTheDocument();

    // Check for the trigger button
    // The button name includes both the icon and "Toggle"
    const triggerButton = screen.getByRole('button', { name: /Toggle/ });
    expect(triggerButton).toBeInTheDocument();

    // Check for the chevrons icon
    const chevronsIcon = screen.getByText('chevrons-up-down-icon');
    expect(chevronsIcon).toBeInTheDocument();

    // Check that the first static item is visible
    const firstRepo = screen.getByText('@radix-ui/primitives');
    expect(firstRepo).toBeInTheDocument();
  });

  it('toggles the collapsible content when the trigger is clicked', () => {
    // Render the DefaultCollapsible story component
    render(<DefaultCollapsible />);

    // Initially, the collapsible content is closed, so the static content is visible
    const firstRepo = screen.getByText('@radix-ui/primitives');
    expect(firstRepo).toBeInTheDocument();

    // Click the trigger button to open the collapsible
    const triggerButton = screen.getByRole('button', { name: /Toggle/ });
    fireEvent.click(triggerButton);

    // After clicking, the additional content should now be visible
    const secondRepo = screen.getByText('@radix-ui/colors');
    expect(secondRepo).toBeInTheDocument();

    const thirdRepo = screen.getByText('@stitches/react');
    expect(thirdRepo).toBeInTheDocument();

    // Click again to close
    fireEvent.click(triggerButton);

    // After clicking again, the additional content should be hidden
    const secondRepoAfterClose = screen.queryByText('@radix-ui/colors');
    expect(secondRepoAfterClose).not.toBeInTheDocument();

    const thirdRepoAfterClose = screen.queryByText('@stitches/react');
    expect(thirdRepoAfterClose).not.toBeInTheDocument();
  });

  it('renders with correct structure', () => {
    // Render the DefaultCollapsible story component
    render(<DefaultCollapsible />);

    // Check for the header section
    const header = screen.getByText('@peduarte starred 3 repositories');
    expect(header).toBeInTheDocument();

    // Check for the trigger button
    const triggerButton = screen.getByRole('button', { name: /Toggle/ });
    expect(triggerButton).toBeInTheDocument();

    // Check that the main container exists with the correct class
    const container = document.querySelector('.w-\\[350px\\]');
    expect(container).toBeInTheDocument();

    // Verify that the container has the space-y-2 class
    expect(container).toHaveClass('space-y-2');
  });

  it('has the correct initial state', () => {
    // Render the DefaultCollapsible story component
    render(<DefaultCollapsible />);

    // Check that the main static content is visible (the collapsible is closed initially)
    const firstRepo = screen.getByText('@radix-ui/primitives');
    expect(firstRepo).toBeInTheDocument();

    // Check that the additional items in the CollapsibleContent are NOT initially visible
    const secondRepo = screen.queryByText('@radix-ui/colors');
    const thirdRepo = screen.queryByText('@stitches/react');
    expect(secondRepo).not.toBeInTheDocument();
    expect(thirdRepo).not.toBeInTheDocument();
  });
});