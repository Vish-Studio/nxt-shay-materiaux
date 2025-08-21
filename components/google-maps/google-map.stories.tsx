import type { Meta, StoryObj } from '@storybook/react';
import GoogleMap, { TLocation } from './google-map';

const meta: Meta<typeof GoogleMap> = {
  title: 'Components/GoogleMap',
  component: GoogleMap,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    zoom: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
    },
    lat: {
      control: { type: 'number' },
    },
    lng: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleLocationClick = (location: TLocation) => {
  console.log('Location clicked:', location);
};

export const Default: Story = {
  args: {
    zoom: 13,
    clickAddLoc: handleLocationClick,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Google Map centered on Mauritius. Requires Google Maps API key to function properly.',
      },
    },
  },
};

export const ZoomedIn: Story = {
  args: {
    zoom: 17,
    clickAddLoc: handleLocationClick,
  },
};

export const ZoomedOut: Story = {
  args: {
    zoom: 8,
    clickAddLoc: handleLocationClick,
  },
};

export const CustomLocation: Story = {
  args: {
    zoom: 15,
    lat: 48.8566,
    lng: 2.3522, // Paris coordinates
    clickAddLoc: handleLocationClick,
  },
  parameters: {
    docs: {
      description: {
        story: 'Google Map centered on a custom location (Paris, France).',
      },
    },
  },
};
