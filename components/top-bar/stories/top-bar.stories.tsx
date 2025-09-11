import type { Meta, StoryObj } from '@storybook/react';
import TopBar from '../top-bar';

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithBackButton: Story = {
  args: {
    leftIcon: 'arrow_back',
    title: 'Add Client',
    redirectBackLink: '/clients',
  },
};

export const WithMenuIcon: Story = {
  args: {
    leftIcon: 'menu',
    title: 'Dashboard',
  },
};

export const WithRightAction: Story = {
  args: {
    leftIcon: 'arrow_back',
    title: 'Edit Profile',
    redirectBackLink: '/profile',
    hasSearch: true,
  },
};
