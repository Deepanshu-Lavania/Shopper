import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import axios from "axios";
import cross_icon from "../../../assets/AdminImage/cross_icon.png";

export default function ListProduct() {
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    const res = await axios.get("http://localhost:8000/getallproduct");
    const Data = res.data;
    console.log("get allProducts  ", Data.product);
    setAllProducts(Data.product);
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const remove_product= async(id)=>{
    const res = await axios.post("http://localhost:8000/removeproduct",{id:id})
    console.log(res.data);
    fetchInfo()
  }
  return (
    <div className="list-product">
      <h2>All Product List</h2>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product) => {
          return(
            <div key={product._id} className="listproduct-format-main listproduct-format">
            <div><img
              src={product.image}
              alt=""
              className="listproduct-product-icon"
            /></div>
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <div>
            <img
              className="listproduct-remove-icon"
              src={cross_icon}
              alt="amdin_product_img"
              onClick={()=>{remove_product(product.id)}}
            />
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
}
