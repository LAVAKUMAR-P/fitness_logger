import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Bmicalc.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield_bmical from "./Textfield_bmical";
import Navbar from "./Navbar";

function Bmicalc() {
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);
  const [status, setStatus] = useState("");

  const validate = Yup.object({
    height: Yup.number().required("height is required"),
    weight: Yup.number().required("weight is required"),
  });


  let handleSubmit = async (value) => {
    let values=await value;
    console.log(values);
    await setHeight(values.height);
    let data_height= await values.height;
    let data_weight= await  values.weight;
    console.log(data_height+  data_weight)
    
    setWeight(data_weight);
    console.log(Weight+"from handle submit");
    console.log(Height +"from handle submit")
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
    <>
      <Navbar />
      <div className="image">
        <div>
          <Formik
            initialValues={{
              height: "",
              weight: "",
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              let data_height=values.height;
              let data_weight=values.weight;
              setHeight(100);
              setWeight(50);
              console.log(values);
              console.log(data_weight);
              console.log(data_height);
              console.log(Weight+"from useste");
              console.log(Height +"from usestate")
              handleSubmit(values);
            }}
          >
            {(formik) => (
              <div className="W-loginContainer">
                <div className="W-content">
                  <div className="L-bmi-title">BMI Calculator</div>
                  <Form>
                    <Textfield_bmical
                      label="Height"
                      name="height"
                      type="text"
                    />
                    <Textfield_bmical
                      label="Weight"
                      name="weight"
                      type="text"
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
