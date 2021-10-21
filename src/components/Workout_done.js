import React, { useState } from "react";
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
      <div className="W-loginContainer">
        <div className="W-content">
          <form onSubmit={handleSubmit}>
            <div className="W-login-title">Workout Out</div>
            <label htmlFor="work" >
              Enter Workout Name
            </label>
            <br />
            <input
              id="work"
              type="text"
              placeholder="Your Name"
              className="W-input"
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
              className="W-input"
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
              className="W-input"
              value={Time}
              onChange={(e) => setTime(e.target.value)}
            ></input>
            <br/>To<br/>
            <input
              type="time"
              placeholder="end time"
              id="Timeto"
              className="W-input"
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
              className="W-input"
              value={Comments}
              onChange={(e) => setComments(e.target.value)}
            ></input>
            <br />
            <div className="W-login-title">
              <input className="W-sign" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Workout_done;
