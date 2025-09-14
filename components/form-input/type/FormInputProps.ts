import type { HTMLProps } from 'react';

export default interface FormInputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
  className?: string;
  title: string;
  hint?: string;
  type: string;
  errorMessage?: string;
  hasError?: boolean;
  hasViewIcon?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
