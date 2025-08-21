import type { Meta, StoryObj } from '@storybook/react';
import ButtonIcon from '../button-icon';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'text' },
    },
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'home',
    onClick: () => console.log('Button icon clicked'),
  },
};

export const Edit: Story = {
  args: {
    icon: 'edit',
    onClick: () => console.log('Edit button clicked'),
  },
};

export const Delete: Story = {
  args: {
    icon: 'delete',
    className: 'danger',
    onClick: () => console.log('Delete button clicked'),
  },
};

export const Settings: Story = {
  args: {
    icon: 'settings',
    onClick: () => console.log('Settings button clicked'),
  },
};
