import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loading_page from "./Loading_page";
import Navbar from "./Navbar";
import "./WorkoutLog.css";
function Adminusers() {
  const [Loading, setLoading] = useState(true);
  const [List, setList] = useState([]);
  let history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);
  let fetchData = async () => {
    try {
      let getdata = await axios.get("http://localhost:3001/getalluser", {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      console.log(getdata);
      setList([...getdata.data]);
      console.log(List);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.message === "Request failed with status code 401") {
        window.localStorage.removeItem("app_token");
        window.localStorage.removeItem("action");
        window.alert("you are not allowed to come here");
        history.push("/");
      }else{
        console.log(error);
        window.alert("Check your network");
      }
    }
  };

  let makeadmin = async (mail) => {
    try {
      let ok = window.confirm("Are you want make admin?");
      if (ok) {
        await axios.post(`http://localhost:3001/makeadmin`,
        {
          email:mail,
        },{
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        });
        await fetchData();
        window.alert("Chaned to admin sucessfully!......");
      } else {
        window.alert("Don't worry you sucessfully canceled Delete data......");
      }
    } catch (error) {
        console.log(error);
        window.alert("Check your network");
    }
  };

  console.log(List);
  return (
    <>
      <div className="workout_image">
        <Navbar />
        {Loading ? (
          <Loading_page />
        ) : (
          <div className="workout_Container_position">
            <div className="workout_Container">
              <div className="W-Card_containet">
                <div>Totel users :</div>
                <div>{List.length}</div>
                <div>
                  <h5>All user Data</h5>
                </div>
              </div>
            </div>
            {List.map((items, index) => {
              return (
                <div className="workout_Container" key={items._id}>
                  <div className="W-Card_containet">
                    <div>User Name :</div>
                    <div>{items.firstName}</div>
                    <div>User Lastname:</div>
                    <div>{items.lastName}</div>
                    <div>Email id:</div>
                    <div>{items.email}</div>
                    <div>Admin</div>
                    <div>{items.admin ? "true" : "false"}</div>
                  </div>
                  <div>
                  {items.admin ? <button className="WL-buttons" >Remove admin</button> : <button className="WL-buttons" onClick={()=>makeadmin(items.email)}>Add admin</button>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Adminusers;
