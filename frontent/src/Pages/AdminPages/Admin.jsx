import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/AdminComponent/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AdminComponent/AddProduct/AddProduct";
import ListProduct from "../../Components/AdminComponent/ListProduct/ListProduct";
import SelectAdmin from "../../Components/AdminComponent/SelectAdmin/SelectAdmin";
import AdminUser from "../../Components/AdminComponent/AdminUser/AdminUser";

function Admin() {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="listproduct" element={<ListProduct />} />
        <Route path="adminuser" element={<AdminUser />} />
        <Route
          path="*"
          element={<SelectAdmin/>}
        />
      </Routes>
    </div>
  );
}
export default Admin;
