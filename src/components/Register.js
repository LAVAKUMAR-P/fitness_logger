import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Register.css";
function Register() {
    const [Name,setName] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [conform,setconform] = useState("");
    let handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            console.log(Name,username,password,conform);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
        <div className="R-loginContainer">
        <div className="R-content">
          <form onSubmit={handleSubmit}>
            <div className="R-login-title">Register</div>
            <label htmlFor="user_Mailid" id="mail">
              Enter Name
            </label>
            <br />
            <input
              type="text"
              placeholder="Your Name"
              className="R-input"
              value={Name}
              onChange={e => setName(e.target.value)}
            
            ></input><br/>
            <label htmlFor="user_Mailid" id="mail">
              Enter email
            </label>
            <br />
            <input
              type="email"
              placeholder="Your Email-ID"
              className="R-input"
              value={username}
              onChange={e => setusername(e.target.value)}
            
            ></input>
            <br />
            <label htmlFor="password">Password</label>
            <br/>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="R-input"
              value={password}
              onChange={e =>setpassword(e.target.value)}
            ></input>
            <br />
            <label htmlFor="C-password">Confirm Password</label>
            <br/>
            <input
              type="password"
              placeholder="Confirm Password"
              id="C-password"
              className="R-input"
              value={conform}
              onChange={e =>setconform(e.target.value)}
            ></input>
            <br />
            <div className="R-login-title">
            <input  className="R-sign" type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
      <Link to="/login"><button>next</button></Link>
        </div>
    )
}

export default Register
