import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Workout_done.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield_workout from "./Textfield_workout.js";

function Workout_done() {
  const validate = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    activity: Yup.string()
      .max(30, "Must be 15 characters or less")
      .required("Ativity Required"),
    time: Yup.number().required("Number Required"),
    comments: Yup.string().max(30, "Must be 30 characters or less"),
  });
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          activity: "",
          time: "",
          comments: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
        {(formik) => (
          <div className="WD-loginContainer">
            <div className="WD-content">
              <div className="WD-login-title">Workout Out</div>
              <Form>
                <Textfield_workout
                  label="Enter Workout Name"
                  name="name"
                  type="text"
                />
                <Textfield_workout
                  label="Type of activity"
                  name="activity"
                  type="text"
                />

                <Textfield_workout
                  label="Time spent at activity"
                  name="time"
                  type="number"
                />

                <Textfield_workout
                  label="Comments"
                  name="comments"
                  type="comment"
                />
                <button className="WD-sign" type="submit">
                  Submit
                </button>
                <button className="WD-sign" type="reset">
                  Reset
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
      <Link to="/login">
        <button>next</button>
      </Link>
    </div>
  );
}

export default Workout_done;
