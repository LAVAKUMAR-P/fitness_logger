import React from 'react'
import './Login.css';
function Login() {
    return (
        <div>
            <div className="L-loginContainer">
                
                <div>
                    <form>
                             <div>
                             LOGIN
                              </div>
                        <label for="user_Mailid" id="mail">Enter emailid</label><br/>
                        <input type="mail"></input><br/>
                        <label for="password">Password</label><br/>
                        <input type="password" id="password"></input><br/>
                        <label for="conform_password">Password</label><br/>
                        <input type="password" id="conform_password"></input><br/>
                        <input type="submit" value="Sign in" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
