import type { Meta, StoryObj } from '@storybook/react';
import { forwardRef } from 'react';
import FormInput from '../form-input';

// Create a wrapper component to handle the ref properly
const FormInputWrapper = forwardRef<HTMLInputElement, any>((props, ref) => {
  return <FormInput {...props} ref={ref} />;
});

FormInputWrapper.displayName = 'FormInputWrapper';

const meta = {
  title: 'Components/FormInput',
  component: FormInputWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'tel', 'number'],
    },
  },
} satisfies Meta<typeof FormInputWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'username',
    hint: 'Enter your username',
    type: 'text',
  },
};

export const Email: Story = {
  args: {
    title: 'email',
    hint: 'Enter your email',
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    title: 'password',
    hint: 'Enter your password',
    type: 'password',
  },
};

export const Phone: Story = {
  args: {
    title: 'phone',
    hint: 'Enter your phone number',
    type: 'tel',
  },
};
