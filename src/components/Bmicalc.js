import React from "react";
import { Link } from "react-router-dom";
import "./Bmicalc.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import { useState } from "react/cjs/react.development";
import Textfield from "./Textfield";
import axios from "axios";

function Bmicalc() {
  const validate = Yup.object({
    your_height: Yup.number().required("height is required"),
    your_weight: Yup.number().required("weight is required"),
  });

  const [bmiResult, setBmiResult] = useState(null);
  const [status, setStatus] = useState("");
 
  let Newvalue,bmi;


  const saveValue = async () => {
 
    try {
        console.log(Newvalue.your_height);
        console.log(Newvalue.your_weight);
      let postData = await axios.post(
        `http://localhost:3001/createbmi`,
        {
          height: Newvalue.your_height,
          weight: Newvalue.your_weight,
          bmi: bmiResult,
          bmiresult: bmi,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );

      window.alert("data posted");
     
    } catch (error) {
      console.log(error);
     
      window.alert("something went wrong")
      
    }
  };

  const clearValue = () => {
    setBmiResult(null);
    setStatus("");
  };

  return (
    <>
      <Navbar />
      <div className="image">
        <div className="W-container">
          <Formik
            initialValues={{
              your_height: "",
              your_weight: "",
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              try {
                let bmi = Number(
                  values.your_weight / (values.your_height / 100) ** 2
                ).toFixed(2);
                setBmiResult(bmi);
                let bmiStatus;
                if (bmi < 18.5) bmiStatus = "Underweight";
                else if (bmi >= 18.5 && bmi < 24.9) bmiStatus = "Normal";
                else if (bmi >= 25 && bmi < 29.9) bmiStatus = "Overweight";
                else bmiStatus = "Obese";
                setStatus(bmiStatus)
                 Newvalue=values;
                 bmi=bmiStatus;
                console.log(`${Newvalue.your_height}`);
                console.log(bmi);
                saveValue()
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {(formik) => (
              <div className="W-loginContainer">
                <div className="W-content">
                  <div className="L-bmi-title">BMI Calculator</div>
                  <Form onSubmit={formik.handleSubmit}>
                    <Textfield
                      label="Your Height"
                      name="your_height"
                      type="number"
                    />
                    <Textfield
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
        </div>
      </div>
    </>
  );
}

export default Bmicalc;
