import React from 'react'
import "./Register.css";
import { ErrorMessage, useField } from 'formik';
function Textfileld_register({ label, ...props }) {
        const [field, meta] = useField(props);
        return (
          <div>
            <label htmlFor={field.name}>{label}</label><br/>
            <input
              className={`L-input ${meta.touched && meta.error &&  'L-input2'}`}
              {...field} {...props}
              autoComplete="off"
            />
            <ErrorMessage component="div" name={field.name} className="error" />
          </div>
          
        )
}

export default Textfileld_register
