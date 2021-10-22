import React from 'react'
import "./Bmicalc.css";
import { ErrorMessage, useField } from 'formik';


function Textfield_bmical({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div>
        <label htmlFor={field.name}>{label}</label><br/>
        <input
          className={`W-input ${meta.touched && meta.error &&  'W-input2'}`}
          {...field} {...props}
          autoComplete="off"
        />
        <ErrorMessage component="div" name={field.name} className="error" />
      </div>
      
    )
}

export default Textfield_bmical
