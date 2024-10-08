import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

export default function ProductDisplay({ product }) {
  const {addToCart} = useContext(ShopContext);//shopContext is the wearhouse
  return (
    <div className="productDisplay">
      <div className="productdisplay">
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
          </div>
          <div className="productdisplay-img">
            <img
              src={product.image}
              alt=""
              className="productdisplay-main-img"
            />
          </div>
        </div>
        <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
          </div>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
              ${product.old_price}
            </div>
            <div className="productdisplay-right-price-new">
              ${product.new_price}
            </div>
          </div>
          <div className="productdisplay-right-description">
            A lightweight, usually knitted, pullover shirt , close-fitting and a
            round neckline and short sleeves , worn as an undershirt or outer
            garment
          </div>
          <div className="productdisplay-right-size">
            <h1>Select size</h1>
            <div className="productdisplay-right-sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>XXL</div>
            </div>
          </div>
          <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
          <div className="category-tag">
            <p className="productdisplay-right-category">
              <span>Category :</span>Women , T-shirt , Crop Top
            </p>
            <p className="productdisplay-right-category">
              <span>Tags :</span>Modern , Latest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
