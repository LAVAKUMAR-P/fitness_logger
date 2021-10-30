import React, { useState } from "react";
import "./Workout_done.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "./Textfield.js";
import Navbar from "./Navbar";
import axios from "axios";
import { workoutdata } from "./Workoutdata";
import { Link } from "react-router-dom";

function Workout() {
  const [Workout, setWorkout] = useState([...workoutdata]);
  console.log(Workout[0]);
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
        <div className="A-position">
                  <Link to="/admin">
                    <button className="E-buttons" type="submit">
                      All users
                    </button>
                  </Link>
                  <Link to="/adminworkoutall">
                    <button className="E-buttons" type="submit">
                      All workout
                    </button>
                  </Link>
                </div>
          <Formik
            initialValues={{
              type: "",
              calories: "",
              set: "",
              unit: "",
              catg: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              values.date = new Date().toLocaleDateString();
              console.log(values);
              try {
                let postData = await axios.post(
                  `http://localhost:3001/workout`,
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
          >
            {(formik) => (
              <div className="WD-loginContainer">
                <div className="WD-content">
                  <div className=".WD-Workout-title">Admin Workout</div>
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

export default Workout;
