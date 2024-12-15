import React from "react";
import "./SelectAdmin.css";

export default function SelectAdmin() {
  return (
    <div className="select-admin-container">
      <div className="welcome-header">
        <h2>
          Welcome 
          <span> Admin</span> to 
          <span className="admin-panel-title"> ClothApp Admin Panel</span>
        </h2>
      </div>
      <div className="sidebar-instruction">
        Please select an option from the sidebar.
      </div>
    </div>
  );
}
