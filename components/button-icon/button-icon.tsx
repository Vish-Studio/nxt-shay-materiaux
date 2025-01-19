

import React, { FunctionComponent } from 'react'
import Icon from '../icon/icon';
import './styles.scss'
import { ButtonIconProps } from './type/button-icon-props';

const ButtonIcon: FunctionComponent<ButtonIconProps> = ({
  className,
  icon,
  onClick,
  ...rest
}) => {
  return (
    <div className={`button-icon ${className}`} {...rest}>
      <button onClick={onClick}>
        <Icon iconName={icon} />
      </button>
    </div>
  )
}

export default ButtonIcon;