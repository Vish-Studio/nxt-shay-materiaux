import type { Meta, StoryObj } from '@storybook/react';
import Profile from '../profile';

const meta = {
  title: 'Components/Profile',
  component: Profile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    imgUrl: 'https://via.placeholder.com/40x40',
  },
};

export const LongName: Story = {
  args: {
    name: 'Christopher Alexander',
    imgUrl: 'https://via.placeholder.com/40x40',
  },
};
