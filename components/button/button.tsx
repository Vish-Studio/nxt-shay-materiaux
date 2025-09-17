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
  dataLoaded = true,
  showContent = true,
  ...rest
}) => {
  return (
    <>
      <button
        className={`button ${variant} ${titleBold ? 'bold' : ''} ${className} ${isDisabled ? 'disabled' : ''} ${dataLoaded ? 'loaded' : 'loading'}`}
        onClick={clickHandler}
        disabled={isDisabled}
        {...rest}
      >
        {showContent ? (
          <>
            {iconName && <Icon iconName={iconName} />}
            {isDisabled ? 'Loading...' : title}
          </>
        ) : (
          <div className="skeleton-content"></div>
        )}
      </button>
    </>
  );
};

export default Button;
