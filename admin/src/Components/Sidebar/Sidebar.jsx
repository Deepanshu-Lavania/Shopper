import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listproduct"}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Product Product</p>
        </div>
      </Link>
    </div>
  );
}
