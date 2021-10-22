import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import "./Login.css";
import Textfield_login from "./Textfield_login";
import { Link } from "react-router-dom";
import Navbar_login from "./Navbar_login";
function Login() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  return (
    <>
      <Navbar_login />
      <div className="image">
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(formik) => (
              <div className="L-loginContainer">
                <div className="L-content">
                  <div className="L-login-title">Login</div>
                  <Form>
                    <Textfield_login label="Email" name="email" type="email" />
                    <Textfield_login
                      label="password"
                      name="password"
                      type="password"
                    />
                    <button className="L-buttons" type="submit">
                      Register
                    </button>
                    <button className="L-buttons" type="reset">
                      Reset
                    </button>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
          <Link to="/workout">
            <button className="L-buttons">next</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
