import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@components/ui/badge.tsx';

const meta = {
  title: 'Examples/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>

const BadgeTemplate: Story = {
  render: ({ ...args }) => <Badge {...args}>Badge</Badge>,
};
export const Default: Story = {
  ...BadgeTemplate,
  args: {},
};
