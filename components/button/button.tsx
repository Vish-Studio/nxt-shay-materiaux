'use client';

import { FunctionComponent } from 'react';
import ButtonProps from './type/button-props';

import './style.scss';

const Button: FunctionComponent<ButtonProps> = ({ title, type, iconName, clickHandler }) => {
  return (
    <>
      <button
        className={`button ${type}`}
        onClick={clickHandler}
      >
        {iconName && <span className="material-symbols-outlined">{iconName}</span>}
        {title}
      </button>
    </>
  );
};

export default Button;
