import React, { useEffect } from "react";
import "./Bmicalc.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import { useState } from "react/cjs/react.development";
import Textfield from "./Textfield";
import axios from "axios";
import { useHistory } from "react-router";

function BmicalcEdit(props) {
  const [Editdata, setEditdata] = useState("");
  const [bmi, setbmi] = useState(null);
  const [status, setStatus] = useState(null);
  let Newvalue;
  let bmiStatus=null;
let history=useHistory();

  useEffect(() => {
    fetchData();
  }, []);
 
  let fetchData = async () => {
    try {
      let getData = await axios.get(
        `http://localhost:3001/getbmiedit/${props.match.params.id}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
     

      setEditdata(getData.data);
    
      
    } catch (error) {
      window.alert("failed to data recived");
      console.log(error);
    }
  };

  const validate = Yup.object({
    your_height: Yup.number().required("height is required"),
    your_weight: Yup.number().required("weight is required"),
  });


  const saveValue = async (bmi,bmiStatus) => {
    let bmiresults=bmi;
    try {
      if (bmiStatus !== null) {
        console.log(Newvalue.your_height);
        console.log(Newvalue.your_weight);
        let postData = await axios.put(
          `http://localhost:3001/editbmi/${props.match.params.id}`,
          {
            height: Newvalue.your_height,
            weight: Newvalue.your_weight,
            bmi: bmiresults,
            bmiresult: bmiStatus,
          },
          {
            headers: {
              Authorization: window.localStorage.getItem("app_token"),
            },
          }
        );

        window.alert("data posted");
        history.push("/workoutlog")
      }
      else{
        window.alert("Sorry something went wrong kindly click calculate again");
      } 
    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        window.alert("your data is there you can only edit it");
      } else {
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
              your_height: Editdata.height,
              your_weight: Editdata.weight,
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              try {
                let bmi = Number(
                  values.your_weight / (values.your_height / 100) ** 2
                ).toFixed(2);
                setbmi(bmi);
                if (bmi < 18.5) bmiStatus = "Underweight";
                else if (bmi >= 18.5 && bmi < 24.9) bmiStatus = "Normal";
                else if (bmi >= 25 && bmi < 29.9) bmiStatus = "Overweight";
                else bmiStatus = "Obese";
                setStatus(bmiStatus);
                Newvalue = values;
                console.log(`${Newvalue.your_height}`);
                console.log(bmi);
                saveValue(bmi,bmiStatus)
              } catch (error) {
                console.log(error);
              }
            }}
            enableReinitialize
          >
            {(formik) => (
              <div className="W-loginContainer">
                <div className="W-content">
                  <div className="L-bmi-title">EDIT BMI</div>
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
                    <button className="W-buttons" type="submit" to="/workoutlog">
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

export default BmicalcEdit;
