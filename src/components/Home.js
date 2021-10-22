import React from 'react'
import { Link } from 'react-router-dom';
import "./Home.css";
function Home() {
    return (
        <div className="image">
            <div>
                <h2>hi guys</h2>
                <Link to="/register">
        <button>next</button>
      </Link>
            </div>
        </div>
    )
}

export default Home
