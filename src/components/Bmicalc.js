import React ,{ useState }from "react";
import "./Bmicalc.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import Textfield from "./Textfield";
import axios from "axios";
import env from "./settings";


function Bmicalc() {
  const validate = Yup.object({
    your_height: Yup.number().required("height is required"),
    your_weight: Yup.number().required("weight is required"),
  });

  const [state, setstate] = useState("")
  const[value,setvalue]=useState(0)

  const clearValue=()=>{
    setstate("")
  }

  const saveValue = async (values) => {
      let Newvalue = values;
    try {
        let postData = await axios.post(`${env.api}/createbmi`,
          {
            height: Newvalue.your_height,
            weight: Newvalue.your_weight,
            bmi:Newvalue.bmiResult,
            bmiresult:Newvalue.bmivalue,
          },
          {
            headers: {
              Authorization: window.localStorage.getItem("app_token"),
            },
          }
        );
        
        window.alert("BMI data saved");
    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        window.alert("your data is there you can only edit it");
      } else {
        window.alert("check your network");
      }
    }
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
                setvalue(bmi)
                values.bmiResult= bmi
               
                let bmiStatus;
                if (bmi < 18.5) bmiStatus = "Underweight";
                else if (bmi >= 18.5 && bmi < 24.9) bmiStatus = "Normal";
                else if (bmi >= 25 && bmi < 29.9) bmiStatus = "Overweight";
                else bmiStatus = "Obese";

                setstate(bmiStatus);
                values.Status=bmiStatus;
                console.log(`${values.your_height}`);
                saveValue(values);
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
                      placeholder="Enter your height (cm)"
                    />
                    <Textfield
                      label="Weight"
                      name="your_weight"
                      type="number"
                      placeholder="Enter your weight (kg)"
                    />
                    <button className="W-buttons" type="submit">
                      Calculate
                    </button>
                    <button className="W-buttons" type="reset">
                      Reset
                    </button>
                    { state && (
                      <div>
                        <p>Your BMI is: {value} </p>
                        <p>You are currently: {state}</p>
                      
                      <button className="W-buttons" onClick={clearValue} >clear</button>
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
