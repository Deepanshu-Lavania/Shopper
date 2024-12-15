import React, { useEffect, useState } from "react";
import "./SelectAdmin.css";
import navlogo from '../../../assets/AdminImage/nav-logo.svg'

export default function SelectAdmin() {
  const [userName, setUsername] = useState("")
    //!for checking admin is or not
    useEffect(() => {
      if (localStorage.getItem("auth-token")) {
        try {
          fetch("http://localhost:8000/getauth", {
            method: "POST",
            headers: {
              Accept: "application/form-data",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: "",
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("data for isAdmin or not  : ", data);
              setUsername(data.username);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }, []);
  return (
    <div className="select-admin-container">
      <div className="welcome-header">
        <h2>
          Welcome 
          <span style={{textTransform:"uppercase"}}> {userName}</span> to 
          {/* <span className="admin-panel-title"> ClothApp Admin Panel</span> */}
          <div><img src={navlogo} alt="" /></div>
        </h2>
      </div>
      <div className="sidebar-instruction">
        Please select an option to show the Details.
      </div>
    </div>
  );
}
