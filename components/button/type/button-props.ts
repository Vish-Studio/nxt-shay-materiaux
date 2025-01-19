import { ButtonTypes } from '@/enums/button-types';
import type { HTMLProps } from 'react';

export default interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  className?: string;
  title: string;
  titleBold?: boolean;
  type?: ButtonTypes;
  variant?: 'rounded' | 'normal';
  iconName?: string;
  isDisabled?: boolean;
  clickHandler?: (data: any) => void;
}
