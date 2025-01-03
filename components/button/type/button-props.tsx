import { ButtonTypes } from '@/enums/button-types';
import type { HTMLProps } from 'react';

export default interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  title: string;
  titleBold?: boolean;
  type?: ButtonTypes;
  variant?: 'rounded' | 'normal';
  iconName?: string;
  clickHandler?: () => void;
}
