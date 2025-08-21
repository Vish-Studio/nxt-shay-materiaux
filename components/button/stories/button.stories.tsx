import type { Meta, StoryObj } from '@storybook/react';
import Button from '../button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['rounded', 'normal'],
    },
    titleBold: {
      control: { type: 'boolean' },
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Button',
    variant: 'rounded',
    titleBold: true,
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Save',
    iconName: 'save',
    variant: 'rounded',
    titleBold: true,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled',
    variant: 'rounded',
    isDisabled: true,
  },
};
