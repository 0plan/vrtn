import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Default, Destructive } from './Alert.stories';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock the lucide-react icon
jest.mock('lucide-react', () => ({
  Terminal: ({ className }: { className?: string }) => (
    <span className={className}>terminal-icon</span>
  ),
}));

describe('Alert Stories', () => {
  it('renders Default story correctly', () => {
    // Render the Default story component
    const { container } = render(<Default.render {...Default.args} />);

    // Check that the Alert component is rendered
    const alertElement = container.querySelector('[role="alert"]');
    expect(alertElement).toBeInTheDocument();
    
    // Check for the Terminal icon
    const terminalIcon = screen.getByText('terminal-icon');
    expect(terminalIcon).toBeInTheDocument();
    
    // Check for the title
    const title = screen.getByText('Heads up!');
    expect(title).toBeInTheDocument();
    
    // Check for the description
    const description = screen.getByText('You can add components to your app using the cli.');
    expect(description).toBeInTheDocument();
  });

  it('renders Destructive story with variant correctly', () => {
    // Render the Destructive story component
    const { container } = render(<Destructive.render {...Destructive.args} />);

    // Check that the Alert component is rendered
    const alertElement = container.querySelector('[role="alert"]');
    expect(alertElement).toBeInTheDocument();
    
    // Check that the destructive variant class is applied
    expect(alertElement).toHaveClass('border-destructive/50 text-destructive');
    
    // Check for the Terminal icon
    const terminalIcon = screen.getByText('terminal-icon');
    expect(terminalIcon).toBeInTheDocument();
    
    // Check for the title
    const title = screen.getByText('Heads up!');
    expect(title).toBeInTheDocument();
    
    // Check for the description
    const description = screen.getByText('You can add components to your app using the cli.');
    expect(description).toBeInTheDocument();
  });

  it('renders Alert with correct structure', () => {
    render(<Default.render {...Default.args} />);

    // Check that all parts of the alert are present
    const title = screen.getByText('Heads up!');
    const description = screen.getByText('You can add components to your app using the cli.');
    const icon = screen.getByText('terminal-icon');
    
    // Verify they are in the right container
    expect(title.closest('[role="alert"]')).toContainElement(title);
    expect(title.closest('[role="alert"]')).toContainElement(description);
    expect(title.closest('[role="alert"]')).toContainElement(icon);
  });
});