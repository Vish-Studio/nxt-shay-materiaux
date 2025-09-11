import type { Meta, StoryObj } from '@storybook/react';
import SearchResults from '../search-results';
import { SearchItem } from '../type/search-results-props';

const meta: Meta<typeof SearchResults> = {
  title: 'Components/SearchResults',
  component: SearchResults,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: SearchItem[] = [
  {
    icon: 'person',
    title: 'John Doe',
    subTitle: 'Client from New York',
    type: 'clients',
  },
  {
    icon: 'business',
    title: 'ABC Corporation',
    subTitle: 'Corporate client',
    type: 'clients',
  },
  {
    icon: 'inventory_2',
    title: 'Laptop Computer',
    subTitle: 'Electronics - $999',
    type: 'products',
  },
  {
    icon: 'phone_iphone',
    title: 'Smartphone',
    subTitle: 'Mobile devices - $599',
    type: 'products',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const ClientsOnly: Story = {
  args: {
    items: sampleItems.filter(item => item.type === 'clients'),
  },
};

export const ProductsOnly: Story = {
  args: {
    items: sampleItems.filter(item => item.type === 'products'),
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const SingleResult: Story = {
  args: {
    items: [sampleItems[0]],
  },
};
