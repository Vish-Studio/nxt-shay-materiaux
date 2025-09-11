import type { Meta, StoryObj } from '@storybook/react';
import BriefItem from './brief-item';

const meta: Meta<typeof BriefItem> = {
  title: 'Components/BriefItem',
  component: BriefItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    value: '100',
  },
};