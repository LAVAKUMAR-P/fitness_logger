import React, { useState } from 'react'

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
        <div className="L-loginContainer">
        <div className="L-content">
          <form onSubmit={handleSubmit}>
            <div className="L-login-title">Register</div>
            <label htmlFor="user_Mailid" id="mail">
              Enter Name
            </label>
            <br />
            <input
              type="text"
              placeholder="Your Name"
              className="L-input"
              value={Name}
              onChange={e => setName(e.target.value)}
            
            ></input>
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
            <label htmlFor="password">Conform Password</label>
            <br/>
            <input
              type="password"
              placeholder="Conform Password"
              id="password"
              className="L-input"
              value={conform}
              onChange={e =>setconform(e.target.value)}
            ></input>
            <br />
            <div className="L-login-title">
            <input  className="L-sign" type="submit" value="Sign in" />
            </div>
          </form>
        </div>
      </div>
        </div>
    )
}

export default Register
