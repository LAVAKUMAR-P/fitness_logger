import React, { useEffect, useState } from "react";
import "./Workout_done.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import axios from "axios";
import Textfield from "./Textfield";
import Loading_page from "./Loading_page";
import MySelect from "./FormiclMySelect";
import env from "./settings";
import { useHistory } from "react-router";

function Edit_Workout_done(props) {
  const [Workout, setWorkout] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  let history = useHistory();

  const [Editdata, setEditdata] = useState("");

  let fetchData = async () => {
    try {
      let getData = await axios.get(
        `${env.api}/getData/${props.match.params.id}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      let Data = await axios.get(`${env.api}/allworkout`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });

      setWorkout([...Data.data]);
      setEditdata(getData.data.message);
    } catch (error) {
      window.alert("failed to data recived");
      console.log(error);
    }
  };
  const validate = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    time: Yup.number().required("Number Required"),
    comments: Yup.string().max(30, "Must be 30 characters or less"),
  });
  const Formvalues = {
    name: Editdata.name,
    time: Editdata.time,
    comments: Editdata.comments,
  };

  return (
    <>
      <Navbar />
      {Editdata.length === 0 ? (
        <Loading_page />
      ) : (
        <div className="image">
          <div className="WD-Container">
            <Formik
              initialValues={Formvalues}
              validationSchema={validate}
              onSubmit={async (values) => {
                let calories, activity;
                for (let x in Workout) {
                  if (Workout[x].type == values.name) {
                    activity = Workout[x].catg;
                    calories = Workout[x].calories * values.time;
                    console.log(calories);
                  }
                }
                values.calories = calories;
                values.activity = activity;
                values.date = new Date().toLocaleDateString();
                try {
                  let getData = await axios.put(
                    `${env.api}/editData/${props.match.params.id}`,
                    { message: values },
                    {
                      headers: {
                        Authorization: window.localStorage.getItem("app_token"),
                      },
                    }
                  );

                  window.alert("Data Edited");
                  history.push("/workoutlog");
                } catch (error) {
                  console.log(error);
                }
              }}
              enableReinitialize
            >
              {(formik) => (
                <div className="WD-loginContainer">
                  <div className="WD-content">
                    <div className=".WD-Workout-title">Edit Workout Out</div>
                    <Form>
                      <MySelect label="Enter Workout Name" name="name">
                        <option value="">Select Workout Name</option>
                        {Workout.map((item, index) => {
                          return (
                            <option value={item.type} key={index * 5}>
                              {item.type}
                            </option>
                          );
                        })}
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
      )}
    </>
  );
}

export default Edit_Workout_done;
