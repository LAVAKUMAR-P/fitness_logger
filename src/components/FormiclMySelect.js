import React from 'react'
import {useField } from 'formik';
function MySelect({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} 
        className={`L-input ${meta.touched && meta.error &&  'L-input2'}`}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
}

export default MySelect


