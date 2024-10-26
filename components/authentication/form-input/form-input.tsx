import { forwardRef, FunctionComponent } from 'react';
import FormInputProps from './type/FormInputProps';

import './style.scss';

const FormInput: FunctionComponent<FormInputProps> = forwardRef(
  ({ title, hint, type, ...rest }, ref) => {
    return (
      <div className="input-field">
        <input
          className="input-field__control"
          ref={ref}
          type={type}
          name={title}
          placeholder={hint}
          {...rest}
        />
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
