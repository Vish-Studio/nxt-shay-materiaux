import type { Meta, StoryObj } from '@storybook/react';
import DetailCardHeader from './detail-card-header';

const meta: Meta<typeof DetailCardHeader> = {
  title: 'Components/DetailCardHeader',
  component: DetailCardHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Header',
    icon: 'account_circle',
  },
};