import type { Meta, StoryObj } from '@storybook/react';
import TableFilter, { TabItem } from '../table-filter';

const meta: Meta<typeof TableFilter> = {
  title: 'Components/Table/TableFilter',
  component: TableFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabItems: TabItem[] = [
  {
    title: 'All',
    clickHandle: () => console.log('All tab clicked'),
  },
  {
    title: 'Active',
    clickHandle: () => console.log('Active tab clicked'),
  },
  {
    title: 'Inactive',
    clickHandle: () => console.log('Inactive tab clicked'),
  },
];

export const Default: Story = {
  args: {
    tabItems: defaultTabItems,
  },
};

export const ClientsTabs: Story = {
  args: {
    tabItems: [
      {
        title: 'All Clients',
        clickHandle: () => console.log('All clients'),
      },
      {
        title: 'Premium',
        clickHandle: () => console.log('Premium clients'),
      },
      {
        title: 'Regular',
        clickHandle: () => console.log('Regular clients'),
      },
    ],
  },
};

export const ProductsTabs: Story = {
  args: {
    tabItems: [
      {
        title: 'All Products',
        clickHandle: () => console.log('All products'),
      },
      {
        title: 'Electronics',
        clickHandle: () => console.log('Electronics'),
      },
      {
        title: 'Clothing',
        clickHandle: () => console.log('Clothing'),
      },
      {
        title: 'Books',
        clickHandle: () => console.log('Books'),
      },
    ],
  },
};

export const SingleTab: Story = {
  args: {
    tabItems: [
      {
        title: 'Dashboard',
        clickHandle: () => console.log('Dashboard clicked'),
      },
    ],
  },
};
