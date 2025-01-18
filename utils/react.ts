import type { ReactNode } from 'react';
import { isValidElement } from 'react';

export const renderValidReactNode = (value: any): ReactNode => {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }
  if (isValidElement(value)) {
    return value;
  }
  return '';
};
