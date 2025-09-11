import type { Meta, StoryObj } from '@storybook/react';
import ButtonCalendar from './button-calendar';

const meta: Meta<typeof ButtonCalendar> = {
  title: 'Components/ButtonCalendar',
  component: ButtonCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Calendar',
    description: 'View calendar',
  },
};