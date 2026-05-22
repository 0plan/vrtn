import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default, CardWithForm } from './Card.stories';
import { describe, it, expect } from '@jest/globals';

// Mock the UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="card" className={className} {...props}>{children}</div>
  ),
  CardContent: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="card-content" className={className} {...props}>{children}</div>
  ),
  CardDescription: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p data-testid="card-description" className={className} {...props}>{children}</p>
  ),
  CardFooter: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="card-footer" className={className} {...props}>{children}</div>
  ),
  CardHeader: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="card-header" className={className} {...props}>{children}</div>
  ),
  CardTitle: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 data-testid="card-title" className={className} {...props}>{children}</h3>
  ),
}));

jest.mock('@/components/ui/switch', () => ({
  Switch: (props: React.HTMLAttributes<HTMLButtonElement>) => (
    <button data-testid="switch" {...props} />
  ),
}));

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label data-testid="label" {...props}>{children}</label>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input data-testid="input" {...props} />
  ),
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select">{children}</div>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-content">{children}</div>
  ),
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-testid="select-item" data-value={value}>{children}</div>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-trigger">{children}</div>
  ),
  SelectValue: (props: React.HTMLAttributes<HTMLSpanElement>) => (
    <span data-testid="select-value" {...props} />
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => (
    <button data-testid="button" className={className} {...props}>{children}</button>
  ),
}));

jest.mock('lucide-react', () => ({
  BellRing: () => <svg data-testid="bell-icon" />,
  Check: () => <svg data-testid="check-icon" />,
}));

describe('Card Stories', () => {
  it('renders the Default story correctly', () => {
    render(<Default.render {...Default.args} />);

    // Check for the main card element
    expect(screen.getByTestId('card')).toBeInTheDocument();

    // Check for card header elements
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('You have 3 unread messages.')).toBeInTheDocument();

    // Check for card content elements
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
    expect(screen.getByTestId('switch')).toBeInTheDocument();

    // Check for notification items
    expect(screen.getAllByText(/Your call has been confirmed.|You have a new message!|Your subscription is expiring soon!/)).toHaveLength(3);

    // Check for card footer
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    expect(screen.getByText('Mark all as read')).toBeInTheDocument();
  });

  it('renders the CardWithForm story correctly', () => {
    render(<CardWithForm.render {...CardWithForm.args} />);

    // Check for the main card element
    expect(screen.getByTestId('card')).toBeInTheDocument();

    // Check for card header elements
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByText('Create project')).toBeInTheDocument();
    expect(screen.getByText('Deploy your new project in one-click.')).toBeInTheDocument();

    // Check for form elements - there are two labels, so use getAllByTestId
    expect(screen.getAllByTestId('label')).toHaveLength(2);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name of your project')).toBeInTheDocument();

    // Check for select elements
    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('select-content')).toBeInTheDocument();
    expect(screen.getAllByTestId('select-item')).toHaveLength(4);

    // Check for footer buttons
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
    expect(screen.getAllByTestId('button')).toHaveLength(2);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Deploy')).toBeInTheDocument();
  });

  it('has the correct structure for Default story', () => {
    render(<Default.render {...Default.args} />);

    // Verify the card has the correct class names
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('w-[380px]');

    // Verify specific elements are present
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();

    // Check for switch functionality
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toBeInTheDocument();

    // Verify notification items
    const notificationItems = screen.getAllByText(/(Your call has been confirmed\.|You have a new message!|Your subscription is expiring soon!)/);
    expect(notificationItems).toHaveLength(3);
  });

  it('has the correct structure for CardWithForm story', () => {
    render(<CardWithForm.render {...CardWithForm.args} />);

    // Verify the card has the correct class names
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('w-[350px]');

    // Verify form elements
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toBeInTheDocument();

    // Verify there are 2 labels in the form
    expect(screen.getAllByTestId('label')).toHaveLength(2);

    // Verify footer has two buttons
    const buttons = screen.getAllByTestId('button');
    expect(buttons).toHaveLength(2);

    // Check button text
    expect(buttons[0]).toHaveTextContent('Cancel');
    expect(buttons[1]).toHaveTextContent('Deploy');
  });

  it('displays notification descriptions correctly', () => {
    render(<Default.render {...Default.args} />);

    // Check that notification descriptions are present - there are multiple "1 hour ago" texts
    expect(screen.getAllByText('1 hour ago')).toHaveLength(2);
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Default.render {...Default.args} />);

    // Check that the card title is a heading element
    const cardTitle = screen.getByTestId('card-title');
    expect(cardTitle.tagName).toBe('H3');
  });
});