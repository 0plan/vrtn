import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

const meta = {
  title: 'Examples/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      defaultValue: 'multiple',
      control: 'select',
      options: ['single', 'multiple'],
    },
    collapsible: {
      control: { type: 'boolean' },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>

const AccordionTemplate: Story = {
  render: ({ ...args }) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
export const Default: Story = {
  ...AccordionTemplate,
  args: {
    className: 'w-96',
  },
};
