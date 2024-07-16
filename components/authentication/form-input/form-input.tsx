import FormInputProps from './type/FormInputProps';
import { FunctionComponent } from 'react';

const FormInput: FunctionComponent<FormInputProps> = ({
    title,
    hint,
    type
}) => {
    return(
        <div className="input-field">
            <label className="form-label mb-4" htmlFor={title}>{title}</label>
            <input className="form-control" type={type} name={title} placeholder={hint}/>
        </div>
    )
}

export default FormInput;