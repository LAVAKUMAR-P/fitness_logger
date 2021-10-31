import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading_page from "./Loading_page";
import Navbar from "./Navbar";
import "./WorkoutLog.css";
import "aos/dist/aos.css"
import Aos from "aos";
import { MdOutlineEditCalendar,MdCreate ,MdDelete} from "react-icons/md";
import env from "./settings";

function WorkoutLog() {
  const [Loading, setLoading] = useState(true);
  const [List, setList] = useState([]);
  const [Bmi, setBmi] = useState([]);
  let newweight;
  useEffect(() => {
    fetchData();
    Aos.init({duration:1500})
  }, []);
  let fetchData = async () => {
    try {
      let Data = await axios.get(`${env.api}/getData`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setList([...Data.data.registerSchemas]);
      setBmi([...Data.data.BMIMessages]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      window.alert("Check your network");
    }
  };


  let handleDelete = async (id) => {
    try {
      let ok = window.confirm("Are you want to delete data permently?");
      
      if (ok) {
        await axios.delete(`${env.api}/deletData/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        });
        await fetchData();
        window.alert("Data deleted sucessfully!......");
      } else {
        window.alert("Don't worry you sucessfully canceled Delete data......");
      }
    } catch (error) {
      console.log(error);
      window.alert("Check your network");
    }
  };
  return (
    <>
      <div className="workout_image">
        <Navbar />
        {Loading ? (
          <Loading_page />
        ) : (
          <div className="workout_Container_position">
            <div className="workout_Container">
              <div className="W-Card_containet">
                <div>YOUR BMI :</div>
                {Bmi.length === 0 ? (
                  <div>Kindly add BMI</div>
                ) : (
                  <div>{Bmi[0].bmi}</div>
                )}
                <div>YOUR Height :</div>
                {Bmi.length === 0 ? (
                  <div>Kindly add your Height</div>
                ) : (
                  <div>{Bmi[0].height}</div>
                )}
                <div>YOUR Weight :</div>
                {Bmi.length === 0 ? (
                  <div>Kindly add your Weight</div>
                ) : (
                  <div>{Bmi[0].weight}</div>
                )}
                <div>Totel data :</div>
                <div>{List.length}</div>
                {List.length === 0 ? <div>Kindly add workout</div> : ""}
                {Bmi.length === 0 ? (
                  ""
                ) : (
                  <div>Normal BMI Range 18.5 — 24.9</div>
                )}
                
              </div>
              <div>
              {Bmi.length === 0 ? (
                  <Link to={`/bmicalc`}>
                  <button className="WL-buttons"> <MdCreate/> Create BMI</button>
                  </Link>
                ) : (
                  <Link to={`/Editbmi/${Bmi[0]._id}`}>
                      <button className="WL-buttons"> <MdOutlineEditCalendar/> Edit</button>
                </Link>
                )}
                
                </div>
            </div>
            {List.map((items, index) => {
              return (
                <div className="workout_Container" key={items._id} data-aos="fade-up">
                  <div className="W-Card_containet">
                    <div>Workout Name :</div>
                    <div>{items.message.name}</div>
                    <div>Workout Type :</div>
                    <div>{items.message.activity}</div>
                    <div>Workout count/range/Hrs :</div>
                    <div>{items.message.time}</div>
                    <div>Calories burned:</div>
                    <div>{items.message.calories}</div>
                    <div>Date :</div>
                    <div>{items.message.date}</div>
                    <div>Comments :</div>
                    <div>{items.message.comments}</div>
                  </div>
                  <div>
                    <Link to={`/EditWorkout/${items._id}`}>
                      <button className="WL-buttons"> <MdOutlineEditCalendar/>  Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(items._id)}
                      className="WL-buttons"
                    >
                      <MdDelete/> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default WorkoutLog;
