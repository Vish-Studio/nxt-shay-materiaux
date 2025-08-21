import type { Meta, StoryObj } from '@storybook/react';
import TagPayment from '../tag-payment';
import { PaymentStatus } from '@/enums/payment-status';

const meta: Meta<typeof TagPayment> = {
  title: 'Components/Table/TagPayment',
  component: TagPayment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: Object.keys(PaymentStatus),
    },
    classname: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Paid: Story = {
  args: {
    status: 'paid',
  },
};

export const Unpaid: Story = {
  args: {
    status: 'unpaid',
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const WithCustomClass: Story = {
  args: {
    status: 'paid',
    classname: 'custom-style',
  },
};
