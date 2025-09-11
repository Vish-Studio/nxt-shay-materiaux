import type { Meta, StoryObj } from '@storybook/react';
import SearchResults from './search-results';
import { SearchItem } from './type/search-results-props';

const meta: Meta<typeof SearchResults> = {
  title: 'Components/SearchResults',
  component: SearchResults,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: SearchItem[] = [
  {
    id: '1',
    icon: 'person',
    title: 'John Doe',
    subTitle: 'Client from New York',
    type: 'clients',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};