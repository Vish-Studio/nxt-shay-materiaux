import { FunctionComponent } from 'react';
import FormInputProps from './type/FormInputProps';

import './style.scss';

const FormInput: FunctionComponent<FormInputProps> = ({ title, hint, type }) => {
  return (
    <div className="input-field">
      <input
        className="input-field__control"
        type={type}
        name={title}
        placeholder={hint}
      />
    </div>
  );
};

export default FormInput;
