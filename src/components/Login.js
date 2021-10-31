import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import "./Login.css";
import Navbar_login from "./Navbar_login";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Textfield from "./Textfield";

function Login() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  let history = useHistory();

  return (
    <>
      <Navbar_login />
      <div className="image">
        <div className="L-container-position">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              try {
                let postData = await axios.post(
                  "http://localhost:3001/login",
                  values
                );
                console.log(postData);
                window.localStorage.setItem("app_token", postData.data.token);
                window.localStorage.setItem("action", postData.data.unconditional);
                window.alert("jwt token generated");
                history.push("/home");
              } catch (error) {
                console.log("error");
                if (error.message === "Request failed with status code 401") {
                  window.alert("user name or password mismatch");
                } else {
                  window.alert("Check your network");
                }
              }
            }}
          >
            {(formik) => (
              <div className="L-loginContainer">
                <div className="L-content">
                  <div className="L-content-position">
                  <div className="L-login-title">Login</div>
                  <Form>
                    <Textfield label="Email" name="email" type="email" />
                    <Textfield
                      label="password"
                      name="password"
                      type="password"
                    />
                      <button className="L-buttons" type="submit">
                        Login
                      </button>
                    <button className="L-buttons" type="reset">
                      Reset
                    </button>
                  </Form>
                  </div>
                  <div className="forgetpassword-position">
                  <Link to="/forgetpassword">forgetpassword?</Link>
                  </div>
                </div>
               
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Login;
