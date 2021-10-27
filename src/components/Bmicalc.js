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

  const[bmi,setbmi]=useState("")
  const [status, setStatus] = useState("");
  let bmiResult=null;
  let Newvalue;


  const saveValue = async () => {
   
    try {
    if(bmiResult!==null){
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
    }
    window.alert("Sorry something went wrong kindly click calculate again");
    } catch (error) {
      if(error.message==="Request failed with status code 409"){
        window.alert("your data is there you can only edit it");
      }
      else{
        window.alert("check your network");
      }
      
    }
  };

  const clearValue = () => {
    
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
                setbmi(bmi)
                bmiResult=bmi;
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
                    {status && (
                      <div>
                        <p>Your BMI is: {bmi} </p>
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
