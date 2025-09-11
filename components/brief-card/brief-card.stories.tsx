import type { Meta, StoryObj } from '@storybook/react';
import BriefCard from './brief-card';

const meta: Meta<typeof BriefCard> = {
  title: 'Components/BriefCard',
  component: BriefCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'clients',
  },
};