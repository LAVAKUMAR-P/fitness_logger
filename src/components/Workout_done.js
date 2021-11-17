import React, { useEffect, useState } from "react";
import "./Workout_done.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "./Textfield.js";
import Navbar from "./Navbar";
import axios from "axios";
import MySelect from "./FormiclMySelect";
import env from "./settings";
import { useHistory } from "react-router";

function Workout_done() {

  const ourRequest = axios.CancelToken.source() ;

  useEffect(() => {
     fetchData();
    return () => {
      ourRequest.cancel("REQUEST CANCELED")
    };
  }, []); 

  let history = useHistory();
  
  const [Workout, setWorkout] = useState([]);

  let fetchData = async () => {
    try {
      let getdata = await axios.get(`${env.api}/allworkout`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
        cancelToken: ourRequest.token,
      });
      
      setWorkout([...getdata.data]);
     
    } catch (error) {
      
      if (error.message === "Request failed with status code 401") {
        window.localStorage.removeItem("app_token");
        window.localStorage.removeItem("action");
        window.alert("you are not allowed to come here");
      }
      else if(error.message !== "REQUEST CANCELED"){
        console.log(error);
        window.alert("Check your network");
      }
    }
  };

 

 
 



  const validate = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    time: Yup.number().required("Number Required"),
    comments: Yup.string().max(30, "Must be 30 characters or less"),
  });
 
  return (
    <>
      <Navbar/>
      <div className="image">
        <div className="WD-Container" >
          <Formik
            initialValues={{
              name: "",
              time: "",
              comments: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              let calories,activity;
              for(let x in Workout){
                if(Workout[x].type==values.name)
                {
                activity = Workout[x].catg;
                calories = (Workout[x].calories*values.time);
                }
             }
             values.calories=calories;
             values.activity =activity ;
             values.date=new Date().toLocaleDateString();
              
              try {
                let postData = await axios.post(`${env.api}/createData`, { message: values },{
                headers : {
                  "Authorization" : window.localStorage.getItem("app_token")
                }
              })
              window.alert("data posted");
              history.push("/workoutlog");
              } catch (error) {
                console.log(error);
                window.alert("Check your network");
              }
            }}
          >
            {(formik) => (
              <div className="WD-loginContainer">
                <div className="WD-content">
                  <div className=".WD-Workout-title">Workout Out Register</div>
                  <Form>
                  <MySelect label="Enter Workout Name" name="name">
                      <option value="">Select Workout Name</option>
                      {
                        Workout.map((item,index)=>{
                          return(
                            <option value={item.type} key={index*5}>{item.type}</option>
                          );
                        })
                      }
                    </MySelect>
                    <Textfield
                      label="Number of sets"
                      name="time"
                      type="number"
                      placeholder="Enter number of sets eg(1)"
                    />

                    <Textfield
                      label="Comments"
                      name="comments"
                      type="comment"
                      placeholder="Enter any comments you want(optional)"
                    />
                    <button className="WD-buttons" type="submit">
                      Submit
                    </button>
                    <button className="WD-buttons" type="reset">
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

export default Workout_done;
