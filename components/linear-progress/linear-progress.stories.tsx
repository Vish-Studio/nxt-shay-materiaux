import type { Meta, StoryObj } from '@storybook/react';
import { LinearProgress } from './linear-progress';

const meta: Meta<typeof LinearProgress> = {
  title: 'Components/LinearProgress',
  component: LinearProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    color: {
      control: { type: 'color' },
    },
    height: {
      control: { type: 'text' },
    },
    position: {
      control: { type: 'select' },
      options: ['fixed', 'relative'],
    },
    isIndeterminate: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progress: 50,
    position: 'relative',
  },
};

export const Loading: Story = {
  args: {
    progress: 25,
    color: '#2196F3',
    position: 'relative',
  },
};

export const Success: Story = {
  args: {
    progress: 100,
    color: '#4CAF50',
    position: 'relative',
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
    color: '#FF9800',
    position: 'relative',
  },
};

export const CustomHeight: Story = {
  args: {
    progress: 75,
    height: '8px',
    color: '#9C27B0',
    position: 'relative',
  },
};

export const Fixed: Story = {
  args: {
    progress: 60,
    position: 'fixed',
  },
};
