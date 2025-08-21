import type { Meta, StoryObj } from '@storybook/react';
import DetailCardHeader from './detail-card-header';

const meta: Meta<typeof DetailCardHeader> = {
  title: 'Components/DetailCardHeader',
  component: DetailCardHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    icon: {
      control: { type: 'text' },
    },
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Client Details',
    icon: 'person',
  },
};

export const ProductHeader: Story = {
  args: {
    title: 'Product Information',
    icon: 'inventory_2',
  },
};

export const OrderHeader: Story = {
  args: {
    title: 'Order Summary',
    icon: 'receipt_long',
  },
};

export const CustomStyled: Story = {
  args: {
    title: 'Custom Header',
    icon: 'star',
    className: 'highlight',
  },
};
