import type { Meta, StoryObj } from '@storybook/react';
import DetailCardItem from './detail-card-item';

const meta: Meta<typeof DetailCardItem> = {
  title: 'Components/DetailCardItem',
  component: DetailCardItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    name: {
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
    title: 'Name',
    name: 'John Doe',
  },
};

export const Email: Story = {
  args: {
    title: 'Email',
    name: 'john.doe@example.com',
  },
};

export const Phone: Story = {
  args: {
    title: 'Phone',
    name: '+1 (555) 123-4567',
  },
};

export const Address: Story = {
  args: {
    title: 'Address',
    name: '123 Main Street, Anytown, USA',
  },
};

export const CustomStyled: Story = {
  args: {
    title: 'Status',
    name: 'Active',
    className: 'status-active',
  },
};
