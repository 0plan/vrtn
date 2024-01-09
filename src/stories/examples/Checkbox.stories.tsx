import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@components/ui/checkbox';

const meta = {
  title: 'Examples/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      description: '`boolean`',
      defaultValue: false,
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>

const CheckboxTemplate: Story = {
  render: ({ ...args }) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};
export const Default: Story = {
  ...CheckboxTemplate,
  args: {},
};
export const Disabled: Story = {
  ...CheckboxTemplate,
  args: {
    disabled: true,
  },
};
