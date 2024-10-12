'use client';

import { FunctionComponent } from 'react';
import ButtonProps from './type/button-props';

import './style.scss';

const Button: FunctionComponent<ButtonProps> = ({ title, type, clickHandler }) => {
  return (
    <button
      className={`button ${type}`}
      onClick={clickHandler}
    >
      {title}
    </button>
  );
};

export default Button;
