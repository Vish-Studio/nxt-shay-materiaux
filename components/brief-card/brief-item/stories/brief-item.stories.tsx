import type { Meta, StoryObj } from '@storybook/react';
import BriefItem from '../brief-item';

const meta: Meta<typeof BriefItem> = {
  title: 'Components/BriefCard/BriefItem',
  component: BriefItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    value: {
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
    title: 'Total Sales',
    value: '1,234',
  },
};

export const WithNumber: Story = {
  args: {
    title: 'Active Users',
    value: 567,
  },
};

export const WithLargeNumber: Story = {
  args: {
    title: 'Revenue',
    value: '$123,456',
  },
};

export const WithCustomClass: Story = {
  args: {
    title: 'Growth Rate',
    value: '+15%',
    className: 'success',
  },
};

export const WithZeroValue: Story = {
  args: {
    title: 'Pending Orders',
    value: 0,
  },
};
