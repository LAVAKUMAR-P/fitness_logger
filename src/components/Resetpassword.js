import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Register.css";
import Navbar_login from "./Navbar_login";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Textfield from "./Textfield";

function Resetpassword() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  let history = useHistory();
  return (
    <>
      <div className="Register-image">
        <Navbar_login />
        <section className="R-loginContainer">
          <div >
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
                let data = {
                  password: values.password,
                  email: values.email,
                };
                try {
                  console.log(data + "postdata");
                  history.push("/");
                } catch (error) {
                  if(error.message==="Request failed with status code 409"){
                    window.alert("Mailid is alredy redistered");
                  }
                  else{
                    window.alert("check your network");
                  }
                }

                console.log(data);
              }}
            >
              {(formik) => (
                <div>
                  <div className="R-content">
                    <div className="R-login-title">Reset password</div>
                    <Form>
                      <Textfield
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                      />
                      <Textfield
                        label="password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                      />
                      <Textfield
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                      />
                       <button className="R-buttons" type="submit">
                        Register
                      </button>
                      <button className="R-buttons" type="reset">
                        Reset
                      </button>
                    </Form>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </section>
      </div>
    </>
  );
}

export default Resetpassword;
