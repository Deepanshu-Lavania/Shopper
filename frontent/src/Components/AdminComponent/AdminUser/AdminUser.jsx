import React, { useEffect, useState } from "react";
import "./AdminUser.css";
import axios from "axios";

export default function AdminUser() {
  const [getAllUser, setGetAllUser] = useState([]);
  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return dateObj.toLocaleString("en-US", options);
  };
  const deleteUser = async (id) => {
    const tell=confirm("Do you want to delete this User ?");
    if (tell) {
      try {
        console.log("ID for deleteAdminUser is:", id);
  
        const res = await axios.post("http://localhost:8000/deleteadminuser", {
          id,
        });
        const Data = res.data;
        console.log("After deleting user:", Data);
        if (res.status === 200) {
          alert(Data.message);
        }
        setGetAllUser(Data.remainingUsers);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }else{
      return;
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await axios.get("http://localhost:8000/getadminuser");
      const Data = res.data;
      console.log("All getusers for admin : ", Data);
      setGetAllUser(Data.getuser);
    };
    fetchAllUsers();
  }, []);
  return (
    <>
      <div className="admin-user">
        <div className="container">
          <h3 style={{textDecoration:"underline"}}>Users Data</h3>
          <div className="container admin-users">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date & Time</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {getAllUser.map((data, idx) => {
                  const { _id, username, email, date } = data;
                  return (
                    <tr key={idx}>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{formatDate(date)}</td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteUser(_id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
