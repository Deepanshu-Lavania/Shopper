import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaUsersLine } from "react-icons/fa6";
import add_product_icon from "../../../assets/AdminImage/Product_Cart.svg";
import list_product_icon from "../../../assets/AdminImage/Product_list_icon.svg";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-two">
        <Link to={"addproduct"}>
          <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
          </div>
        </Link>
        <Link to={"listproduct"}>
          <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Product Product</p>
          </div>
        </Link>
      </div>
      <div>
        <Link to={"adminuser"} style={{ color: "black" }}>
          <div className="sidebar-item ">
            <h3
              style={{
                fontWeight: "900",
                textAlign: "center",
                height: "25px",
                color: "#ffcc00",
              }}
            >
              <FaUsersLine style={{ height: "100%" }} />
            </h3>
            <p>Admin User</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
