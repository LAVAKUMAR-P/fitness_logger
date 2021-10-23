import React from 'react'
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import "./Register.css";
import Textfileld_register from './Textfileld_register';
import Navbar_login from './Navbar_login';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


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

  let history = useHistory()
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
      onSubmit={async (values) => {
        let data={firstName:values.firstName,lastName:values.lastName,password:values.password,email:values.email}
        try {
          let postData = await axios.post("http://localhost:3001/",data);
          window.alert("data posted")
          console.log(postData+"postdata");
          history.push("/login")
        } catch (error) {
          console.log(error);
        }

        console.log(data);
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
