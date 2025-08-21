import type { Meta, StoryObj } from '@storybook/react';
import BriefCard from './brief-card';

const meta: Meta<typeof BriefCard> = {
  title: 'Components/BriefCard',
  component: BriefCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['products', 'clients'],
    },
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ClientsType: Story = {
  args: {
    type: 'clients',
    children: (
      <div style={{ padding: '20px' }}>
        <h3>Client Brief</h3>
        <p>This is a brief card for displaying client information.</p>
      </div>
    ),
  },
};

export const ProductsType: Story = {
  args: {
    type: 'products',
    children: (
      <div style={{ padding: '20px' }}>
        <h3>Product Brief</h3>
        <p>This is a brief card for displaying product information.</p>
      </div>
    ),
  },
};

export const WithCustomClass: Story = {
  args: {
    type: 'clients',
    className: 'custom-class',
    children: (
      <div style={{ padding: '20px' }}>
        <h3>Custom Brief</h3>
        <p>This brief card has a custom class applied.</p>
      </div>
    ),
  },
};
