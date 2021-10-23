import React from "react";
import { Link } from "react-router-dom";
import "./Bmicalc.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield_bmical from "./Textfield_bmical";
import Navbar from "./Navbar";
import { useState } from "react/cjs/react.development";

function Bmicalc() {

  const validate = Yup.object({
    your_height: Yup.number().required("height is required"),
    your_weight: Yup.number().required("weight is required"),
  });

  const [bmiResult, setBmiResult] = useState(null);
  const [status, setStatus] = useState("");



  const clearValue = () => {
    setBmiResult(null);
    setStatus("");
  };

  return (
    <>
      <Navbar />
      <div className="image">
        <div>
          <Formik
            initialValues={{
              your_height: "",
              your_weight: "",
            }}
            validationSchema={validate}
            onSubmit={ (values) => {
             console.log(values.your_weight)
             console.log(values.your_height);
             let bmi = Number(values.your_weight / (values.your_height / 100) ** 2).toFixed(2);
             setBmiResult(bmi);
             let bmiStatus;
             if (bmi < 18.5) bmiStatus ="Underweight";
             else if (bmi >= 18.5 && bmi < 24.9) bmiStatus= "Normal";
             else if (bmi >= 25 && bmi < 29.9) bmiStatus= "Overweight";
             else bmiStatus= "Obese";
             setStatus(bmiStatus);
            }}
          >
            {(formik) => (
              <div className="W-loginContainer">
                <div className="W-content">
                  <div className="L-bmi-title">BMI Calculator</div>
                  <Form onSubmit={formik.handleSubmit}>
                    <Textfield_bmical
                      label="Your Height"
                      name="your_height"
                      type="number"
                    />
                    <Textfield_bmical
                      label="Weight"
                      name="your_weight"
                      type="number"
                    />
                    <button className="W-buttons" type="submit">
                      Calculate
                    </button>
                    <button className="W-buttons" type="reset">
                      Reset
                    </button>
                    {bmiResult && (
                      <div>
                        <p>Your BMI is: {bmiResult} </p>
                        <p>You are currently: {status}</p>
                        <button className="W-buttons" onClick={clearValue}>
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
            <button className="W-buttons">next</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Bmicalc;
