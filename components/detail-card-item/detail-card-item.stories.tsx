import type { Meta, StoryObj } from '@storybook/react';
import DetailCardItem from './detail-card-item';

const meta: Meta<typeof DetailCardItem> = {
  title: 'Components/DetailCardItem',
  component: DetailCardItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Label',
    name: 'Value',
  },
};