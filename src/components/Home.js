import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import HomeCard from "./HomeCard";
import Loading_page from "./Loading_page";
import axios from "axios";
import env from "./settings";

function Home() {
  let history = useHistory();
  const [Loading, setLoading] = useState(true);
  const [Admin, setAdmin] = useState(false);
  const [Workout, setWorkout] = useState([]);
  useEffect(async() => {
    let admin =window.localStorage.getItem("action");
    setAdmin(admin);
    fetchData();
    
  }, []);


  let fetchData = async () => {
    try {
      let getdata = await axios.get(`${env.api}/allworkout`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
    
      setWorkout([...getdata.data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.message === "Request failed with status code 401") {
        window.localStorage.removeItem("app_token");
        window.localStorage.removeItem("action");
        window.alert("you are not allowed to come here");
        history.push("/");
      } else {
        setLoading(false);
        console.log(error);
        window.alert("Check your network");
      }
    }
  };

  let Logout = async () => {
    try {
      let check = window.confirm("Are you sure? Wanna Logout");
      if (check) {
        window.localStorage.removeItem("app_token");
        window.localStorage.removeItem("action");
        history.push("/");
      }
    } catch (error) {
      window.alert("some thing went wrong try again");
    }
  };

  return (
    <>
      <Navbar />
      {Loading ?  <Loading_page />:<div className="home_background">
      <div className="H-overallcontent">
        <div className="H-content-position H-font">
          WELCOME TO FITNESSLOGGER
          </div>
          <div className="Logout-button-position">
            {Admin == "true" ? (
              <Link to="/admin">
                <button className="H-buttons" type="reset">
                  <MdDashboardCustomize /> Admin Dashboard
                </button>
              </Link>
            ) : (
              ""
            )}
            <button className="H-buttons" type="reset" onClick={Logout}>
              <AiOutlineLogout /> Logout
            </button>
          </div>
          <div className="">
            <div className="H-content-position">
              <div className="H-first_container">
                &#128522; This app is developed for Education purpose so Data
                here taken are not accurate.
                <br />
                &#128522; By following below data in cards you can do your work
                out and save that values
              </div>
  
            <div className="H-gird">
              {Workout.map((data, index) => {
                return (
                  <HomeCard
                    key={index * 2}
                    Name={data.type}
                    Set={data.set}
                    Unit={data.unit}
                    Calories={data.calories}
                  />
                );
              })}
            </div>
            </div>
          </div>
        </div>
       
      </div>
      }
      
       
    </>
  );
}

export default Home;
