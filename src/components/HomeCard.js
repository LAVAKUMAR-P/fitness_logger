import React from 'react'
import "./HomeCard.css";

function HomeCard(props) {
    return (
        <div className="Card-container">
            <h6>Workout Name : {props.Name}</h6>
            <h6>Workout Range (per 1 set) : {props.Set} {props.Unit}</h6>
            <h6>calories : {props.Calories}</h6>
        </div>
    )
}

export default HomeCard
