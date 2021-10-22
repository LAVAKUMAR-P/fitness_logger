import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar_login from "./Navbar_login";

function Home() {
  return (
    <>
      <Navbar_login />
      <div className="image">
        <div>
          <h2>hi guys</h2>
          <Link to="/register">
            <button className="H-buttons">next</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
