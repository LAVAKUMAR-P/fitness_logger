import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Workout_done.css";
import { Field, Form, Formik, useField } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import Navbar from "./Navbar";
import axios from "axios";
import Textfield from "./Textfield";

function Edit_Workout_done(props) {
  const [Editdata, setEditdata] = useState("");
  const [Namedata, setNamedata] = useState("");
  const [Activitydata, setActivitydata] = useState("");
  const [Timedata, setTimedata] = useState("");
  const [Comdata, setComdata] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    try {
      let getData = await axios(
        `http://localhost:3001/getData/${props.match.params.id}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      console.log(getData);
      setEditdata(getData.data.message);
      // window.alert("data recived");
    } catch (error) {
      console.log(error);
    }
  };
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
  // const formik=useFormik({
  //   initialValues:{
  //     productName:"",
  //     price:"",
  //   },
  //   validate={validate}
  //   onSubmit: async (values) => {
  //    console.log(values);
  //   }

  // })
  const Formvalues={
    name: Editdata.name,
    activity: Editdata.activity,
    time: Editdata.time,
    comments: Editdata.comments,
  }

  return (
    <>
    <Navbar/>
    <div className="image">
      <div>
        <Formik
          initialValues={Formvalues}
          validationSchema={validate}
          onSubmit={async (values) => {
            try {
              let getData = await axios.put(
                `http://localhost:3001/editData/${props.match.params.id}`,{ message: values },
                {
                  headers: {
                    Authorization: window.localStorage.getItem("app_token"),
                  },
                }
              );
              console.log(values);
              window.alert("data posted");
              console.log(values);
              window.alert("data updated");
              console.log(Namedata);
            } catch (error) {
              console.log(error);
            }
          }}
          enableReinitialize
        >
          {(formik) => (
            <div className="WD-loginContainer">
              <div className="WD-content">
                <div className=".WD-Workout-title">Workout Out</div>
                <Form>
                  <Textfield
                    label="Enter Workout Name"
                    name="name"
                    type="text"
                  />
                  <Textfield
                    label="Type of activity"
                    name="activity"
                    type="text"
                  />

                  <Textfield
                    label="Time spent at activity"
                    name="time"
                    type="number"
                  />

                  <Textfield
                    label="Comments"
                    name="comments"
                    type="comment"
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
        <Link to="/login">
          <button className="WD-buttons">next</button>
        </Link>
      </div>
    </div>
  </>
  );
}

export default Edit_Workout_done;
