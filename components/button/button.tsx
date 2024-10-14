'use client';

import { FunctionComponent } from 'react';
import ButtonProps from './type/button-props';

import Icon from '../icon/icon';
import './styles.scss';

const Button: FunctionComponent<ButtonProps> = ({
  title,
  titleBold,
  type,
  iconName,
  clickHandler }) => {
  return (
    <>
      <button
        className={`button ${type} ${titleBold ? 'bold' : ''}`}
        onClick={clickHandler}
      >
        {iconName && <Icon iconName={iconName} />}
        {title}
      </button>
    </>
  );
};

export default Button;
