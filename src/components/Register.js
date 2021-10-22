import React from 'react'
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import "./Register.css";
import Textfileld_register from './Textfileld_register';
import Navbar_login from './Navbar_login';


function Register() {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })
return (
  <>
  <Navbar_login/>
  <div className="image">
  <div>
        
          <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={values => {
        console.log(values)
      }}
    >{formik => (
      
      <div className="R-loginContainer">
        <div className="R-content">
        <div className="R-login-title">Register</div>
          <Form>
            <Textfileld_register label="First Name" name="firstName" type="text" />
            <Textfileld_register label="last Name" name="lastName" type="text" />
            <Textfileld_register label="Email" name="email" type="email" />
            <Textfileld_register label="password" name="password" type="password" />
            <Textfileld_register label="Confirm Password" name="confirmPassword" type="password" /> 
            <button className="R-buttons" type="submit">Register</button>
            <button className="R-buttons" type="reset">Reset</button>
          </Form>
          
        </div>
      </div>
    )}
        
      
      </Formik>
      <Link to="/login"><button className="R-buttons">next</button></Link>
        </div>
        </div>
        </>
    )
}

export default Register
