import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';
import { ButtonTypes } from '@/enums/button-types';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Button',
    type: ButtonTypes.Button,
    variant: 'rounded',
    isDisabled: false,
  },
};