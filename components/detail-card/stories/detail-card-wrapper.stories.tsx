import type { Meta, StoryObj } from '@storybook/react';
import DetailCardWrapper from '../detail-card-wrapper';
import DetailCardItem from '../../detail-card-item/detail-card-item';

const meta: Meta<typeof DetailCardWrapper> = {
  title: 'Components/DetailCard/DetailCardWrapper',
  component: DetailCardWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    isEditing: {
      control: { type: 'boolean' },
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
    title: 'Client Information',
    children: (
      <>
        <DetailCardItem title="Name" name="John Doe" />
        <DetailCardItem title="Email" name="john.doe@example.com" />
        <DetailCardItem title="Phone" name="+1 (555) 123-4567" />
      </>
    ),
  },
};

export const ProductCard: Story = {
  args: {
    title: 'Product Details',
    children: (
      <>
        <DetailCardItem title="Name" name="Laptop Computer" />
        <DetailCardItem title="Price" name="$999.99" />
        <DetailCardItem title="Category" name="Electronics" />
        <DetailCardItem title="Stock" name="25 units" />
      </>
    ),
  },
};

export const EditingMode: Story = {
  args: {
    title: 'Edit Client',
    isEditing: true,
    children: (
      <>
        <DetailCardItem title="Name" name="Jane Smith" />
        <DetailCardItem title="Email" name="jane.smith@example.com" />
        <DetailCardItem title="Status" name="Active" />
      </>
    ),
  },
};

export const SingleItem: Story = {
  args: {
    title: 'Simple Card',
    children: <DetailCardItem title="Status" name="Active" />,
  },
};
