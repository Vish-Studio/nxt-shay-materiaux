'use client';

import { forwardRef, FunctionComponent, useState, useEffect, useRef } from 'react';
import FormInputProps from './type/FormInputProps';

import './style.scss';
import Icon from '../icon/icon';

const FormInput: FunctionComponent<FormInputProps> = forwardRef(
  ({ className, title, hint, type, errorMessage, hasError, hasViewIcon = false, ...rest }, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const viewClick = (e: any) => {
      e.preventDefault();
      setIsVisible(!isVisible);
    };

    // Auto-resize textarea
    const adjustTextareaHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto';
        // Set the height to match the content
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    useEffect(() => {
      if (type === 'textarea') {
        // Initial adjustment when component mounts
        adjustTextareaHeight();
      }
    }, [type]);

    // Also adjust when the value changes externally (e.g., from react-hook-form)
    useEffect(() => {
      if (type === 'textarea' && textareaRef.current) {
        adjustTextareaHeight();
      }
    }, [rest.value, type]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Adjust height on every change
      setTimeout(() => adjustTextareaHeight(), 0);

      if (rest.onChange) {
        rest.onChange(e as any);
      }
    };

    const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      // Also handle input event for better responsiveness
      adjustTextareaHeight();
    };

    return (
      <div className={`form-input ${className}`}>
        <div className="input-field">
          {type === 'textarea' ? (
            <textarea
              className={`input-field__control input-field__textarea ${hasError ? 'error' : ''}`}
              ref={(e) => {
                textareaRef.current = e;
                if (ref && typeof ref === 'function') {
                  ref(e as any);
                } else if (ref) {
                  (ref as any).current = e;
                }
              }}
              name={title}
              placeholder={hint}
              onChange={handleTextareaChange}
              onInput={handleTextareaInput}
              {...(rest as any)}
            />
          ) : (
            <input
              className={`input-field__control ${hasError ? 'error' : ''}`}
              ref={ref}
              type={isVisible ? 'text' : type}
              name={title}
              placeholder={hint}
              {...rest}
            />
          )}

          {hasViewIcon && (
            <Icon
              iconName="visibility"
              clickHandler={viewClick}
            />
          )}
        </div>

        {errorMessage && <span className="txt-error">{errorMessage}</span>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
