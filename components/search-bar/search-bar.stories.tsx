import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from './search-bar';
import { SearchContext } from '@/context/SearchContext';
import { useState } from 'react';

const SearchBarWrapper = (props: any) => {
  const [searchResults, setSearchResults] = useState('');

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      <SearchBar {...props} />
    </SearchContext.Provider>
  );
};

const meta = {
  title: 'Components/SearchBar',
  component: SearchBarWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBarWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hintText: 'Search...',
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    hintText: 'Search for clients, products...',
  },
};
