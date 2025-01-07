'use client'

import { forwardRef, FunctionComponent, useState } from 'react';
import FormInputProps from './type/FormInputProps';

import './style.scss';
import Icon from '../icon/icon';

const FormInput: FunctionComponent<FormInputProps> = forwardRef(
  ({ 
    title, 
    hint, 
    type, 
    hasError, 
    hasViewIcon = false, 
    ...rest 
  }, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const viewClick = (e: any) => {
      e.preventDefault();
      setIsVisible(!isVisible);
    }  


    return (
      <div className="input-field">
        <input
          className={`input-field__control ${hasError ? 'error' : ''}`}
          ref={ref}
          type={isVisible ? 'text' : type}
          name={title}
          placeholder={hint}
          {...rest}
        />

        {
          hasViewIcon && (
            <Icon iconName='visibility' clickHandler={viewClick}/>
          )
        }
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
