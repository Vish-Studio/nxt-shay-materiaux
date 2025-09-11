import type { Meta, StoryObj } from '@storybook/react';
import ButtonFab from './button-fab';

const meta: Meta<typeof ButtonFab> = {
  title: 'Components/ButtonFab',
  component: ButtonFab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'add',
    type: 'normal',
  },
};