import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Bmicalc.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield_bmical from "./Textfield_bmical";
import Navbar from "./Navbar";

function Bmicalc() {
  const validate = Yup.object({
    height: Yup.number().required("height is required"),
    weight: Yup.number().required("weight is required"),
  });
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);
  const [status, setStatus] = useState("");

  let handleSubmit = async () => {
    try {
      let bmi = Number(Weight / (Height / 100) ** 2).toFixed(2);
      setBmiResult(bmi);
      let bmiStatus = getStatus(bmi);
      setStatus(bmiStatus);
      setHeight("");
      setWeight("");
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    else if (bmi >= 18.5 && bmi < 24.9) return "Normal";
    else if (bmi >= 25 && bmi < 29.9) return "Overweight";
    else if (bmi === "NaN") return "Enter right value";
    else return "Obese";
  };

  const clearValue = () => {
    setBmiResult(null);
    setStatus("");
  };

  return (
    <div>
       <Navbar/>
      <Formik
        initialValues={{
          height: "",
          weight: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          setHeight(values.height);
          setWeight(values.weight);
          handleSubmit();
        }}
      >
        {(formik) => (
          <div className="W-loginContainer">
            <div className="W-content">
              <div className="L-login-title">BMI Calculator</div>
              <Form>
                <Textfield_bmical label="Height" name="height" type="text" />
                <Textfield_bmical label="Weight" name="weight" type="text" />
                <button className="L-sign" type="submit">
                  Calculate
                </button>
                <button className="L-sign" type="reset">
                  Reset
                </button>
                {bmiResult && (
                  <div>
                    <p>Your BMI is: {bmiResult} </p>
                    <p>You are currently: {status}</p>
                    <button className="W-sign" onClick={clearValue}>
                      Clere
                    </button>
                  </div>
                )}
              </Form>
            </div>
          </div>
        )}
      </Formik>
      <Link to="/">
        <button>next</button>
      </Link>
    </div>
  );
}

export default Bmicalc;
