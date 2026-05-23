import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Default } from './Accordion.stories';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

describe('Accordion Stories', () => {
  it('renders the Default story correctly with triggers visible', () => {
    // Render the Default story component
    render(<Default.render {...Default.args} />);

    // Check if the accordion triggers are present (they should always be visible)
    expect(screen.getByText('Is it accessible?')).toBeInTheDocument();
    expect(screen.getByText('Is it styled?')).toBeInTheDocument();
    expect(screen.getByText('Is it animated?')).toBeInTheDocument();

    // The content should not be visible initially (since accordion is closed by default)
    expect(screen.queryByText('Yes. It adheres to the WAI-ARIA design pattern.')).not.toBeInTheDocument();
    expect(screen.queryByText("Yes. It comes with default styles that matches the other components' aesthetic.")).not.toBeInTheDocument();
    expect(screen.queryByText("Yes. It's animated by default, but you can disable it if you prefer.")).not.toBeInTheDocument();
  });

  it('allows expanding accordion items', async () => {
    render(<Default.render {...Default.args} />);

    const trigger1 = screen.getByText('Is it accessible?');
    const contentText = 'Yes. It adheres to the WAI-ARIA design pattern.';

    // Initially, content should not be in the document
    expect(screen.queryByText(contentText)).not.toBeInTheDocument();

    // Click on the first trigger to expand
    fireEvent.click(trigger1);

    // Wait for the content to appear
    await waitFor(() => {
      expect(screen.getByText(contentText)).toBeInTheDocument();
    }, { timeout: 500 });
  });

  it('respects the collapsible prop when set to false', async () => {
    // Render an accordion with collapsible disabled
    render(
      <Accordion type="single" collapsible={false}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Test Trigger</AccordionTrigger>
          <AccordionContent>Test Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByText('Test Trigger');
    fireEvent.click(trigger);

    // After clicking, content should be visible
    await waitFor(() => {
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    }, { timeout: 500 });

    // Click again - with collapsible={false}, it shouldn't close
    fireEvent.click(trigger);

    // Content should still be visible since collapsible is false
    expect(screen.queryByText('Test Content')).toBeInTheDocument();
  });

  it('supports multiple expansion when type is multiple', async () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByText('Trigger 1');
    const trigger2 = screen.getByText('Trigger 2');

    fireEvent.click(trigger1);
    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    }, { timeout: 500 });

    fireEvent.click(trigger2);
    await waitFor(() => {
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    }, { timeout: 500 });

    // Both contents should remain visible with type="multiple"
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('supports single expansion when type is single', async () => {
    render(
      <Accordion type="single" collapsible={true}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByText('Trigger 1');
    const trigger2 = screen.getByText('Trigger 2');

    // Click first trigger
    fireEvent.click(trigger1);
    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    }, { timeout: 500 });

    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    // Click second trigger - with type="single", it should close the first one
    fireEvent.click(trigger2);
    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    }, { timeout: 500 });

    await waitFor(() => {
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    }, { timeout: 500 });
  });
});