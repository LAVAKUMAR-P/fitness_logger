import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Workout_done.css";
import { Field, Form, Formik, useField } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import axios from "axios";
import Textfield from "./Textfield";
import Loading_page from "./Loading_page";
import MySelect from "./FormiclMySelect";

function Edit_Workout_done(props) {

  useEffect(() => {
    fetchData();
  }, []);


  const [Editdata, setEditdata] = useState("");
  let fetchData = async () => {
    try {
      let getData = await axios.get(
        `http://localhost:3001/getData/${props.match.params.id}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      console.log(getData);
      setEditdata(getData.data.message);
      window.alert("data recived");
    } catch (error) {
      window.alert("failed to data recived");
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
    { 
       (Editdata.length === 0)? <Loading_page/>:

    <div className="image">
      <div className="WD-Container">
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
                      <option value="Running">Running</option>
                      <option value="Walking">Walking</option>
                      <option value="Step walk">Step walk</option>
                      <option value="Skiping">Skiping</option>
                    </MySelect>
             

                    <MySelect label="Type of activity" name="activity">
                      <option value="">Select Type of activity</option>
                      <option value="Cardio">Cardio</option>
                      <option value="others">others</option>
                    </MySelect>

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
    }
  </>
  );
}

export default Edit_Workout_done;
