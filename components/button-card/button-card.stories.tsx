import type { Meta, StoryObj } from '@storybook/react';
import ButtonCard from './button-card';

const meta = {
  title: 'Components/ButtonCard',
  component: ButtonCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof ButtonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clients: Story = {
  args: {
    title: 'Clients',
    iconName: 'account_circle',
    numTotal: '200',
    numTotalTxt: 'total clients',
    redirect: '/clients',
  },
};

export const Products: Story = {
  args: {
    title: 'Products',
    iconName: 'inventory_2',
    numTotal: '550',
    numTotalTxt: 'total products',
    redirect: '/products',
    className: 'yellow',
  },
};

export const Orders: Story = {
  args: {
    title: 'Orders',
    iconName: 'receipt_long',
    numTotal: '125',
    numTotalTxt: 'pending orders',
    redirect: '/orders',
    className: 'green',
  },
};
