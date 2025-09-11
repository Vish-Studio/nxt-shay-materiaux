import type { Meta, StoryObj } from '@storybook/react';
import TagPayment from './tag-payment';

const meta: Meta<typeof TagPayment> = {
  title: 'Components/TagPayment',
  component: TagPayment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    paymentStatus: 'paid',
  },
};