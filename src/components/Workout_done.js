import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Workout_done.css';

function Workout_done() {
    const [Name,setName] = useState("");
    const [activity, setactivity] = useState("");
    const [Time, setTime] = useState("");
    const [Comments,setComments] = useState("");
    const [Timeto, setTimeto] = useState("");
    let handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            console.log("this is out put"+Name,activity,Time,Timeto,Comments);
            setName("");

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <div className="WD-loginContainer">
        <div className="WD-content">
          <form onSubmit={handleSubmit}>
            <div className="WD-login-title">Workout Out</div>
            <label htmlFor="work" >
              Enter Workout Name
            </label>
            <br />
            <input
              id="work"
              type="text"
              placeholder="Your Name"
              className="WD-input"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <br />
            <label htmlFor="activity" >
              Type of activity
            </label>
            <br />
            <input
            id="activity"
              type="text"
              placeholder="Type of activity"
              className="WD-input"
              value={activity}
              onChange={(e) => setactivity(e.target.value)}
            ></input>
            <br />
            <label htmlFor="Time">Time spent at activity</label>
            <br />
            From <br/>
            <input
              type="time"
              placeholder="start time"
              id="Time"
              className="WD-input"
              value={Time}
              onChange={(e) => setTime(e.target.value)}
            ></input>
            <br/>To<br/>
            <input
              type="time"
              placeholder="end time"
              id="Timeto"
              className="WD-input"
              value={Timeto}
              onChange={(e) => setTimeto(e.target.value)}
            ></input>
            <br />
            <label htmlFor="Comments">Comments</label>
            <br />
            <input
              type="comment"
              placeholder="Comments"
              id="Comments"
              className="WD-input"
              value={Comments}
              onChange={(e) => setComments(e.target.value)}
            ></input>
            <br />
            <div className="WD-login-title">
              <input className="WD-sign" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
      <Link to="/bmicalc"><button>next</button></Link>
    </div>
  );
}

export default Workout_done;
