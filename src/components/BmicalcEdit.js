import React, { useEffect,useState } from "react";
import "./Bmicalc.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import Textfield from "./Textfield";
import axios from "axios";
import { useHistory } from "react-router";
import env from "./settings";

function BmicalcEdit(props) {
  const [Editdata, setEditdata] = useState("");
  const [state, setstate] = useState("")
  const[value,setvalue]=useState(0)
  
let history=useHistory();

  useEffect(() => {
    fetchData();
  }, []);
 
  let fetchData = async () => {
    try {
      let getData = await axios.get(
        `${env.api}/getbmiedit/${props.match.params.id}`,
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


  const saveValue = async (values) => {
    let Newvalue = values;
    try {
      
        
        let postData = await axios.put(
          `${env.api}/editbmi/${props.match.params.id}`,
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
          });
        window.alert("data posted");
        history.push("/workoutlog")
     
    } catch (error) {
      window.alert("check your network");
    }
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
                      placeholder="Enter your height (cm)"
                    />
                    <Textfield
                      label="Weight"
                      name="your_weight"
                      type="number"
                      placeholder="Enter your weight (kg)"
                    />
                    <button className="W-buttons" type="submit" to="/workoutlog">
                     Calculate
                    </button>
                    <button className="W-buttons" type="reset">
                    Reset
                    </button>
                    {state && (
                      <div>
                        <p>Your BMI is: {value} </p>
                        <p>You are currently: {state}</p>
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
