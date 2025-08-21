import type { Meta, StoryObj } from '@storybook/react';
import ButtonCalendar from '../button-calendar';
import { Date } from '@/types/global';

const meta: Meta<typeof ButtonCalendar> = {
  title: 'Components/ButtonCalendar',
  component: ButtonCalendar,
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

const todayDate: Date = {
  day: 21,
  month: 8,
};

const sampleItems = {
  data: [
    {
      title: 'Client Meeting',
      time: '10:00 AM',
      color: 'client' as const,
    },
    {
      title: 'Payment Due',
      time: '2:00 PM',
      color: 'payment' as const,
    },
    {
      title: 'Product Review',
      time: '4:30 PM',
      color: 'product' as const,
    },
  ],
};

export const Default: Story = {
  args: {
    date: todayDate,
    items: sampleItems,
  },
};

export const EmptySchedule: Story = {
  args: {
    date: todayDate,
    items: { data: [] },
  },
};

export const SingleEvent: Story = {
  args: {
    date: todayDate,
    items: {
      data: [sampleItems.data[0]],
    },
  },
};

export const DifferentMonth: Story = {
  args: {
    date: {
      day: 15,
      month: 12,
    },
    items: sampleItems,
  },
};
