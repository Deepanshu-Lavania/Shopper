import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../../assets/breadcrum_arrow.png";
export default function Breadcrum({ product }) {
  return (
    <div>
      Home <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" />
      {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
}
