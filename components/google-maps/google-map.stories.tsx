import type { Meta, StoryObj } from '@storybook/react';
import GoogleMap from './google-map';

const meta: Meta<typeof GoogleMap> = {
  title: 'Components/GoogleMap',
  component: GoogleMap,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    zoom: 13,
    lat: -20.164793,
    lng: 57.504370,
  },
};