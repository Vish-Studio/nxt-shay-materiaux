import type { Meta, StoryObj } from '@storybook/react';
import DetailCard from './detail-card-wrapper';

const meta: Meta<typeof DetailCard> = {
  title: 'Components/DetailCard',
  component: DetailCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    children: <div>Card content</div>,
  },
};