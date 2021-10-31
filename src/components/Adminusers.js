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
import {MdPersonRemove,MdPersonAddAlt1,MdOutlineViewList,MdCreate} from "react-icons/md";

function Adminusers() {
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
      let getdata = await axios.get("http://localhost:3001/getalluser", {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
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
        console.log(error);
        window.alert("Check your network");
      }
    }
  };

  let makeadmin = async (mail) => {
    try {
      let ok = window.confirm("Are you want make admin?");
      if (ok) {
        await axios.post(
          `http://localhost:3001/makeadmin`,
          {
            email: mail,
          },
          {
            headers: {
              Authorization: window.localStorage.getItem("app_token"),
            },
          }
        );
        await fetchData();
        window.alert("Chaned to admin sucessfully!......");
      } else {
        window.alert("Don't worry you sucessfully canceled Make admin......");
      }
    } catch (error) {
      console.log(error);
      window.alert("Check your network");
    }
  };

  let removeadmin = async (mail) => {
    try {
      let ok = window.confirm("Are you want make admin?");
      if (ok) {
        await axios.post(
          `http://localhost:3001/removeadmin`,
          {
            email: mail,
          },
          {
            headers: {
              Authorization: window.localStorage.getItem("app_token"),
            },
          }
        );
        await fetchData();
        window.alert("Chaned to user sucessfully!......");
      } else {
        window.alert("Don't worry you sucessfully canceled remove admin......");
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
                <ExportCSV csvData={viewers} fileName={fileName} />
                <Link to={`/adminworkoutall`}>
                  <button className="E-buttons"><MdOutlineViewList/>  Workout List</button>
                </Link>
                <Link to={`/adminworkout`}>
                  <button className="E-buttons"><MdCreate/> Create workout</button>
                </Link>
              </div>
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
                  <div
                    className="workout_Container"
                    key={items._id}
                    data-aos="fade-up"
                  >
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
                      {items.admin ? (
                        <button
                          className="WL-buttons"
                          onClick={() => removeadmin(items.email)}
                        >
                          <MdPersonRemove/>{"  "}
                          Remove admin
                        </button>
                      ) : (
                        <button
                          className="WL-buttons"
                          onClick={() => makeadmin(items.email)}
                        >
                          <MdPersonAddAlt1/>{"  "}
                          Add admin
                        </button>
                      )}
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

export default Adminusers;
