import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";

function Home() {
let history=useHistory()
const [Admin, setAdmin] = useState(false)


useEffect(async() => {
  let admin =window.localStorage.getItem("action");
  console.log(admin+"-------------------------------------------------------------");
  await setAdmin(admin);
}, [])


  let Logout=async()=>{
    try {
      let check = window.confirm("Are you sure? Wanna Logout");
    if(check){
      window.localStorage.removeItem("app_token");
      window.localStorage.removeItem("action");
      history.push("/")
    }  
    } catch (error) {
      window.alert("some thing went wrong try again");
    }  
  }

  return (
    <>
      <Navbar/>
      <div className="Logout-button-position">
      {
         (Admin ==="true" )? (<button className="L-buttons" type="reset" onClick={Logout}>Admin Dashboard</button>):""

      }
      <button className="L-buttons" type="reset" onClick={Logout}>
       Logout
      </button>
      </div>
      <div className="">
        <div>
          <h2>hi guys</h2>
        </div>
      </div>
    </>
  );
}

export default Home;
