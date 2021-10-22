import React from 'react'
import { ErrorMessage, useField } from 'formik';
import './Workout_done.css';

function Textfield_workout({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div>
        <div>
        <label htmlFor={field.name}>{label}</label><br/>
        <input
          className={`WD-input ${meta.touched && meta.error && 'WD-input2'} `}
          {...field} {...props}
          autoComplete="off"
        />
        <ErrorMessage component="div" name={field.name} className="error" />
      </div> 
      </div>
    )
}

export default Textfield_workout
