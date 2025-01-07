import type { HTMLProps } from 'react';

export default interface FormInputProps extends HTMLProps<HTMLInputElement> {
  title: string;
  hint?: string;
  type: string;
  hasError?: boolean;
  hasViewIcon?:boolean;
}
