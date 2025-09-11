import type { Meta, StoryObj } from '@storybook/react';
import TableFilter from './table-filter';

const meta: Meta<typeof TableFilter> = {
  title: 'Components/TableFilter',
  component: TableFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { id: 'all', label: 'All', isActive: true },
      { id: 'active', label: 'Active', isActive: false },
    ],
  },
};