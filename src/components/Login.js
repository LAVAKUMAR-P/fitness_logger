import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
function Login() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    let handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            console.log(username,password);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <div className="L-loginContainer">
        <div className="L-content">
          <form onSubmit={handleSubmit}>
            <div className="L-login-title">LOGIN</div>
            <label htmlFor="user_Mailid" id="mail">
              Enter email
            </label>
            <br />
            <input
              type="email"
              placeholder="Your Email-ID"
              className="L-input"
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
              className="L-input"
              value={password}
              onChange={e =>setpassword(e.target.value)}
            ></input>
            <br />
            <div className="L-login-title">
            <input  className="L-sign" type="submit" value="Sign in" />
            </div>
          </form>
        </div>
      </div>
      <Link to="/workout"><button>next</button></Link>
    </div>
  );
}

export default Login;
