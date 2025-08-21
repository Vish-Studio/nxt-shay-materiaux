import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../modal';
import { useState } from 'react';

const ModalWrapper = (props: any) => {
  const [isOpen, setIsOpen] = useState(props.isOpen || false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        {...props}
        isOpen={isOpen}
        primaryClick={() => setIsOpen(false)}
        secondaryClick={() => setIsOpen(false)}
      />
    </div>
  );
};

const meta = {
  title: 'Components/Modal',
  component: ModalWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  args: {
    className: 'warning',
    icon: 'error',
    title: 'Error',
    description: 'An error occurred while processing your request.',
    primaryText: 'Try again',
    isOpen: false,
  },
};

export const Success: Story = {
  args: {
    className: 'success',
    icon: 'check_circle',
    title: 'Success',
    description: 'Your action was completed successfully.',
    primaryText: 'Continue',
    isOpen: false,
  },
};

export const Confirmation: Story = {
  args: {
    icon: 'help',
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action?',
    primaryText: 'Yes, proceed',
    secondaryText: 'Cancel',
    isOpen: false,
  },
};
