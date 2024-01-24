import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';

const meta = {
  title: 'Examples/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>

const AlertTemplate: Story = {
  render: ({ ...args }) => (
    <Alert {...args}>
      <div className="i-lucide:terminal h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};
export const Default: Story = {
  ...AlertTemplate,
  args: {},
};

export const Destructive: Story = {
  ...AlertTemplate,
  args: {
    variant: 'destructive',
  },
};
