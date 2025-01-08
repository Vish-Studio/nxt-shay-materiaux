'use client';

import { FunctionComponent } from 'react';
import ButtonProps from './type/button-props';

import Icon from '../icon/icon';
import './styles.scss';

const Button: FunctionComponent<ButtonProps> = ({
  className,
  title,
  titleBold,
  variant = 'normal',
  iconName,
  isDisabled,
  clickHandler,
  ...rest
}) => {
  return (
    <>
      <button
        className={`button ${variant} ${titleBold ? 'bold' : ''} ${className} ${isDisabled ? 'disabled' : ''}`}
        onClick={clickHandler}
        disabled={isDisabled}
        {...rest}
      >
        {iconName && <Icon iconName={iconName} />}
        {title}
      </button>
    </>
  );
};

export default Button;
