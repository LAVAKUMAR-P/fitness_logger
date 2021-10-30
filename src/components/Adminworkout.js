import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loading_page from "./Loading_page";
import Navbar from "./Navbar";
import "./WorkoutLog.css";
import "./Adminusers.css";
import { ExportCSV } from "./ExportCSV";
import "aos/dist/aos.css";
import Aos from "aos";
import { Link } from "react-router-dom";

function Adminworkout() {
  const [Loading, setLoading] = useState(true);
  const [List, setList] = useState([]);
  let history = useHistory();
  const fileName = "FitnessLog_user_Data";

  const viewers = List;

  useEffect(() => {
    fetchData();
    Aos.init({ duration: 1500 });
  }, []);

  let fetchData = async () => {
    try {
      let getdata = await axios.get("http://localhost:3001/allworkout", {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      console.log(getdata);
      setList([...getdata.data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.message === "Request failed with status code 401") {
        window.localStorage.removeItem("app_token");
        window.localStorage.removeItem("action");
        window.alert("you are not allowed to come here");
        history.push("/");
      } else {
        setLoading(false);
        console.log(error);
        window.alert("Check your network");
      }
    }
  };

  let handledelete = async (id) => {
    try {
      let ok = window.confirm("Are you want Delete data?");
      if (ok) {
        await axios.delete(`http://localhost:3001/deleteworkout/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        });
        await fetchData();
        window.alert("Deleted sucessfully!......");
      } else {
        window.alert("Don't worry you sucessfully canceled Delete......");
      }
    } catch (error) {
      console.log(error);
      window.alert("Check your network");
    }
  };

  return (
    <>
      <div className="workout_image">
        <Navbar />
        {Loading ? (
          <Loading_page />
        ) : (
          <div>
            <div className="workout_Container_position">
              <div className="export_document_position">
                <Link to={`/admin`}>
                  <button className="E-buttons">Back to admin users</button>
                </Link>
                <Link to={`/adminworkout`}>
                  <button className="E-buttons">Create workout</button>
                </Link>
              </div>
              <div className="workout_Container">
                <div className="W-Card_containet">
                  <div>Totel Workout :</div>
                  <div>{List.length}</div>
                  <div>
                    <h5>All user Data</h5>
                  </div>
                </div>
              </div>
              {List.map((items, index) => {
                return (
                  <div
                    className="workout_Container"
                    key={items._id}
                    data-aos="fade-up"
                  >
                    <div className="W-Card_containet">
                      <div>Worout Type:</div>
                      <div>{items.type}</div>
                      <div>category</div>
                      <div>{items.catg}</div>
                      <div>set and unit</div>
                      <div>
                        {items.set} {items.unit}
                      </div>
                      <div>Date</div>
                      <div>{items.date}</div>
                    </div>
                    <div>
                      <button
                        className="WL-buttons"
                        onClick={() => handledelete(items._id)}
                      >
                        Delete
                      </button>

                      <Link to={`/EditworkoutA/${items._id}`}>
                        {" "}
                        <button className="WL-buttons">Edit</button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Adminworkout;
