import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@components/ui/button.tsx';

const meta = {
  title: 'Examples/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: 'select',
      options: ['bg-green-500', 'bg-red-500', 'bg-blue-500'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>

const ButtonTemplate: Story = {
  render: ({ ...args }) => <Button {...args}>Button</Button>,
};

export const Primary: Story = {
  ...ButtonTemplate,
  args: {},
};

export const Secondary: Story = {
  ...ButtonTemplate,
  args: {
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  ...ButtonTemplate,
  args: {
    variant: 'destructive',
  },
};

export const Outline: Story = {
  ...ButtonTemplate,
  args: {
    variant: 'outline',
  },
};

export const Link: Story = {
  ...ButtonTemplate,
  args: {
    variant: 'link',
  },
};

export const Ghost: Story = {
  ...ButtonTemplate,
  args: {
    variant: 'ghost',
  },
};
export const Loading: Story = {
  render: () => (
    <Button disabled>
      <div className="i-lucide:loader-2 mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ),
};

export const IconButton: Story = {
  render: () => (
    <Button>
      <div className="i-lucide:mail mr-2 h-4 w-4" />
      Login with Email
    </Button>
  ),
};

export const CustomClassName: Story = {
  ...ButtonTemplate,
  args: {
    className: 'bg-amber-300 text-black hover:bg-green-300',
  },
};
