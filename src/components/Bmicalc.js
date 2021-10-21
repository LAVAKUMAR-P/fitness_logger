import React, { useState } from "react";
import { Link } from "react-router-dom";

function Bmicalc() {
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);
  const [status, setStatus] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let bmi = Number(Weight / (Height / 100) ** 2).toFixed(2);
      setBmiResult(bmi);
      let bmiStatus = getStatus(bmi);
      setStatus(bmiStatus);
      setHeight("");
      setWeight("");
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    else if (bmi >= 18.5 && bmi < 24.9) return "Normal";
    else if (bmi >= 25 && bmi < 29.9) return "Overweight";
    else if (bmi === "NaN") return "Enter right value";
    else return "Obese";
  };

  const clearValue = () => {
    setBmiResult(null);
    setStatus("");
  };

  return (
    <div>
      <div className="W-loginContainer">
        <div className="W-content">
          <form onSubmit={handleSubmit}>
            <div className="W-login-title">BMI calculater</div>
            <label htmlFor="height">Enter your height</label>
            <br />
            <input
              id="height"
              type="text"
              placeholder="Height (cm)"
              className="W-input"
              value={Height}
              onChange={(e) => setHeight(e.target.value)}
            ></input>
            <br />
            <label htmlFor="Weight">Enter your Weight</label>
            <br />
            <input
              id="Weight"
              type="text"
              placeholder="Weight (kg)"
              className="W-input"
              value={Weight}
              onChange={(e) => setWeight(e.target.value)}
            ></input>
            <br />
            <div className="W-login-title">
              <input className="W-sign" type="submit" value="Calculate" />
            </div>
            {bmiResult && (
              <div className="mt-4">
                <p>Your BMI is: {bmiResult} </p>
                <p>You are currently: {status}</p>
                <button className="W-sign" onClick={clearValue}>
                  Clere
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <Link to="/">
        <button>next</button>
      </Link>
    </div>
  );
}

export default Bmicalc;
