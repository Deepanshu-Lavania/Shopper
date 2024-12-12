import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import axios from "axios";

export default function AddProduct() {
  const [image, setImage] = useState(null);
  const [prouductDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    console.log("e.target.files : ", e.target.files);
    setImage(e.target.files[0]); 
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(`Field Changed: ${name}, New Value: ${value}`);
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const add_Product = async () => {
    try {
      //! FormData() allows you to construct and manage key-value pairs to represent form data
      //*  FormData() is commonly used for sending data via XMLHttpRequest or fetch when submitting forms, especially when the form includes files or binary data.
      //* FormData() used for Uploading files, such as images, videos, or documents.
      let form_data = new FormData();
      console.log("image of useSate is : ",image);
      
      form_data.append("product", image); // Ensure "product" matches the key in `upload.single('product')`

      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: form_data, // No `Content-Type` header; the browser sets it automatically for `FormData`
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log("response Data is : ", responseData);
        console.log("productDetails is : ", prouductDetails);
        // setProductDetails((prevDetails) => ({
        //   ...prevDetails,
        //   image: responseData.image_url,
        // }));
        prouductDetails.image = responseData.image_url;
        console.log("Product uploaded successfully:", responseData.image_url);
        console.log("productDetails is : ", prouductDetails);
        const res = await axios.post(
          "http://localhost:8000/addproduct",
          prouductDetails
        );
        const Data = res.data;
        console.log("add product is : ", Data);
        setTimeout(() => {
          setImage(null);
          setProductDetails({
            name: "",
            image: "",
            new_price: "",
            old_price: "",
          });
        }, 2000);
        alert(Data.message);
      } else {
        console.error("Failed to upload product image.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={prouductDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
          autoComplete="off"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={prouductDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here old_price"
            autoComplete="off"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={prouductDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here new_price"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={prouductDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        {/* When you call " URL.createObjectURL(image) ", the browser creates a temporary URL that points to the file data stored in memory. */}
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-img"
            alt="uplaod_area"
            autoComplete="off"
          />
        </label>
        <input
          value={prouductDetails.image || ""}
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
          autoComplete="off"
        />
      </div>
      <button
        onClick={() => {
          add_Product();
        }} // Executes add_Product when clicked.
        className="addproduct-btn"
      >
        Add
      </button>
      {/* <button onClick={add_Product()}>Click Me</button> Executes add_Product immediately during render */}
    </div>
  );
}
