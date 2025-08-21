import type { Meta, StoryObj } from '@storybook/react';
import ButtonFab from '../button-fab';

const meta: Meta<typeof ButtonFab> = {
  title: 'Components/ButtonFab',
  component: ButtonFab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['normal', 'mini'],
    },
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

export const Normal: Story = {
  args: {
    icon: 'add',
    type: 'normal',
    clickHandler: () => console.log('Normal FAB clicked'),
  },
};

export const Mini: Story = {
  args: {
    icon: 'edit',
    type: 'mini',
    clickHandler: () => console.log('Mini FAB clicked'),
  },
};

export const WithCustomIcon: Story = {
  args: {
    icon: 'favorite',
    type: 'normal',
    className: 'custom-fab',
    clickHandler: () => console.log('Custom FAB clicked'),
  },
};
