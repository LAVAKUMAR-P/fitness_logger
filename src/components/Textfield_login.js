import React from 'react'
import "./Login.css";
import { ErrorMessage, useField } from 'formik';
function Textfield_login({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div>
            <div>
            <label htmlFor={field.name}>{label}</label><br/>
            <input
              className={`L-input ${meta.touched && meta.error && 'L-input2'} `}
              {...field} {...props}
              autoComplete="off"
            />
            <ErrorMessage component="div" name={field.name} className="error" />
          </div> 
        </div>
    )
}

export default Textfield_login
