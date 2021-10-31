import React, { useEffect, useState } from "react";
import "./Workout_done.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "./Textfield.js";
import Navbar from "./Navbar";
import axios from "axios";
import { workoutdata } from "./Workoutdata";
import { useHistory } from "react-router";
import env from "./settings";

function EditworkoutA(props) {
  const [Workout, setWorkout] = useState([...workoutdata]);
 
  useEffect(() => {
    fetchData();
  }, []);

 let history=useHistory();
  let fetchData = async () => {
    try {
      let getData = await axios.get(
        `${env.api}/getworkout/${props.match.params.id}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      setWorkout(getData.data);
    } catch (error) {
      window.alert("failed to data recived");
      console.log(error);
    }
  };

  
  const validate = Yup.object({
    type: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Workout name is Required"),
    calories: Yup.number().required("calories Required"),
    set: Yup.number().required("set Required"),
    unit: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("unit Required"),
    catg: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("category Required"),
  });
  return (
    <>
      <Navbar />
      <div className="image">
        <div className="WD-Container">
          <Formik
            initialValues={{
              type: Workout.type,
              calories: Workout.calories,
              set: Workout.set,
              unit: Workout.unit,
              catg: Workout.catg,
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              values.date = new Date().toLocaleDateString();
              
              try {
                let postData = await axios.put(
                  `${env.api}/editworkout/${props.match.params.id}`,
                  {
                    type: values.type,
                    calories: values.calories,
                    set: values.set,
                    unit: values.unit,
                    catg: values.catg,
                    date: values.date,
                  },
                  {
                    headers: {
                      Authorization: window.localStorage.getItem("app_token"),
                    },
                  }
                );
                window.alert("Workout posted");
                history.push("/adminworkoutall")
              } catch (error) {
                if (error.message === "Request failed with status code 401") {
                  window.localStorage.removeItem("app_token");
                  window.localStorage.removeItem("action");
                  window.alert("you are not allowed to come here");
                } else {
                  console.log(error);
                  window.alert("Check your network");
                }
              }
            }}

            enableReinitialize
          >
            {(formik) => (
              <div className="WD-loginContainer">
                <div className="WD-content">
                  <div className=".WD-Workout-title">Workout Out Register</div>
                  <Form>
                    <Textfield
                      label="Workout Name"
                      name="type"
                      type="text"
                      placeholder="Enter workout name"
                    />
                    <Textfield
                      label="calories Burn Per set"
                      name="calories"
                      type="number"
                      placeholder="Enter calories eg(10)"
                    />
                    <Textfield
                      label="Activity count per set"
                      name="set"
                      type="number"
                      placeholder="Enter Activity count eg(10)"
                    />

                    <Textfield
                      label="Unit name(KM/steps)"
                      name="unit"
                      type="text"
                      placeholder="Enter Unit eg(KM,steps)"
                    />
                    <Textfield
                      label="Workout category "
                      name="catg"
                      type="text"
                      placeholder="Enter category (Eg:Cardio)"
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

export default EditworkoutA;
