import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading_page from "./Loading_page";
import Navbar from "./Navbar";
import "./WorkoutLog.css";
function WorkoutLog() {
    const[Loading,setLoading]=useState(true)
    const [List, setList] = useState([]);
    const [Count, setCount] = useState(0);
    useEffect(() => {
       fetchData()
    }, []);
    let fetchData= async()=>{
        try {
            let Data= await axios.get("http://localhost:3001/getData",{
             headers : {
                 "Authorization" : window.localStorage.getItem("app_token")
               }
            }) 
            setList([...Data.data]);
           
            setLoading(false)
         } catch (error) {
            setLoading(false)
             console.log(error);
             window.alert("Check your network")
         }
    }
   let handleDelete=async(id)=>{
          try {
           let ok =window.confirm("Are you want to delete data permently?")
            console.log(id);
           if(ok)
           {
            await axios.delete(`http://localhost:3001/deletData/${id}`,{
              headers : {
                "Authorization" : window.localStorage.getItem("app_token")
              }
            });
            await fetchData();
            window.alert("Data deleted sucessfully!......");
           }
           else{
            window.alert("Don't worry you sucessfully canceled Delete data......");
           }
          } catch (error) {
            console.log(error);
            window.alert("Check your network");
          }
   }
  return (
    <>
    
        
      <div className="workout_image">
        <Navbar />
        {
        Loading ? <Loading_page/>:
        <div className="workout_Container_position">
          <div className="workout_Container">
            <div className="W-Card_containet">
              <div>Totel data :</div>
              <div>{List.length}</div>
              {
                  (List.length===0)? <div>Kindly add workout</div> : ""
              }
            </div>
          </div>
        {
            
            List.map((items,index)=>{
                
                return(
                    <div className="workout_Container" key={items._id}>
                    <div className="W-Card_containet">
                      <div>Workout Name :</div>
                      <div>{items.message.name}</div>
                      <div>Workout Type :</div>
                      <div>{items.message.activity}</div>
                      <div>Workout count/range/Hrs :</div>
                      <div>{items.message.time}</div>
                      <div>Comments</div>
                      <div>{items.message.comments}</div>
                    </div>
                    <div>
                      <Link to={`/EditWorkout/${items._id}`}><button className="WL-buttons">Edit</button></Link>
                        <button onClick={() => handleDelete(items._id)} className="WL-buttons">Delete</button>
                    </div>
                  </div>
                );
            }

            )
         
        }
        </div>
        }
      </div>
      
    </>
  );
}

export default WorkoutLog;
