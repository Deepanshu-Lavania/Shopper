import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";

export default function App() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar takes only the space it needs */}
      <div style={{ flexShrink: 0 }}>
        <Navbar />
      </div>

      {/* Admin takes the remaining space and becomes scrollable */}
      <div style={{ flexGrow: 1, overflowY: "auto" }}>
        <Admin />
      </div>

      {/* Footer section takes only the space it needs */}
      <div style={{ flexShrink: 0, height: "1vh" }}></div>
    </div>
    
  );
}
