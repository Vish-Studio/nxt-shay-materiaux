'use client';

import { FunctionComponent } from 'react';
import ButtonProps from './type/button-props';

import Icon from '../icon/icon';
import './styles.scss';

const Button: FunctionComponent<ButtonProps> = ({
  title,
  titleBold,
  variant = 'normal',
  iconName,
  clickHandler,
  ...rest
}) => {
  return (
    <>
      <button
        className={`button ${variant} ${titleBold ? 'bold' : ''}`}
        onClick={clickHandler}
        {...rest}
      >
        {iconName && <Icon iconName={iconName} />}
        {title}
      </button>
    </>
  );
};

export default Button;
