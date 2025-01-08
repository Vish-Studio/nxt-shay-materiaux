import type { HTMLProps } from 'react';

export default interface FormInputProps extends HTMLProps<HTMLInputElement> {
  className?: string;
  title: string;
  hint?: string;
  type: string;
  errorMessage?: string;
  hasError?: boolean;
  hasViewIcon?:boolean;
}
