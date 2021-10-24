import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Workout_done.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "./Textfield.js";
import Navbar from "./Navbar";
import axios from "axios";

function Edit_Workout_done(props) {
  console.log(props);
     const [Editdata, setEditdata] = useState("")
  useEffect(() => {
    fetchData();
  }, []);
      
    let fetchData = async()=>{
      try {
        let getData= await axios(`http://localhost:3001/getData/${props.match.params.id}`,{
          headers : {
            "Authorization" : window.localStorage.getItem("app_token")
          }
        })
        console.log(getData);
        window.alert("data recived")
      } catch (error) {
        console.log(error);
      }
    }
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
    <>
      <Navbar />
      <div className="image">
        <div>
          <Formik
            initialValues={{
              name: "",
              activity: "",
              time: "",
              comments: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              console.log(values);
              let postData = await axios.post(
                `http://localhost:3001`,
                { message: values },
                {
                  headers: {
                    Authorization: window.localStorage.getItem("app_token"),
                  },
                }
              );
              window.alert("data posted");
              console.log(values);
            }}
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
