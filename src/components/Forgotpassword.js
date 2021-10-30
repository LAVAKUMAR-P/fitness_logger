import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import "./Login.css";
import Navbar_login from "./Navbar_login";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Textfield from "./Textfield";

function Forgotpassword() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required")
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
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              try {
               console.log(values);
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
                  <div className="L-login-title">Forgotpassword</div>
                  <Form>
                    <Textfield label="Email" name="email" type="email" placeholder="Enter your mail id" />
                      <button className="L-buttons" type="submit">
                        submit
                      </button>
                    <button className="L-buttons" type="reset">
                      Reset
                    </button>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Forgotpassword;
