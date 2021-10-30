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
import { workoutdata } from "./Workoutdata";

function Edit_Workout_done(props) {
  const [Workout, setWorkout] = useState([]);
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
      let Data = await axios.get("http://localhost:3001/allworkout", {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      console.log(Data);
      setWorkout([...Data.data]);
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
    time: Yup.number().required("Number Required"),
    comments: Yup.string().max(30, "Must be 30 characters or less"),
  });
  const Formvalues={
    name: Editdata.name,
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
            let calories,activity;
            for(let x in Workout){
              if(Workout[x].type==values.name)
              {
              activity = Workout[x].catg;
              calories = (Workout[x].calories*values.time);
              console.log(calories);
            }
           }
           values.calories=calories;
             values.activity =activity ;
             values.date=new Date().toLocaleDateString();
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
                      {
                        Workout.map((item,index)=>{
                          return(
                            <option value={item.type} key={index*5}>{item.type}</option>
                          );
                        })
                      }
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
      </div>
    </div>
    }
  </>
  );
}

export default Edit_Workout_done;
