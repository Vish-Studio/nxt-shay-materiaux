import type { Meta, StoryObj } from '@storybook/react';
import Icon from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconName: {
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
    iconName: 'home',
  },
};

export const Settings: Story = {
  args: {
    iconName: 'settings',
  },
};

export const Add: Story = {
  args: {
    iconName: 'add',
  },
};

export const Edit: Story = {
  args: {
    iconName: 'edit',
  },
};

export const Delete: Story = {
  args: {
    iconName: 'delete',
  },
};

export const WithClickHandler: Story = {
  args: {
    iconName: 'favorite',
    clickHandler: () => console.log('Icon clicked!'),
  },
};

export const CustomStyled: Story = {
  args: {
    iconName: 'star',
    className: 'custom-icon',
  },
};
