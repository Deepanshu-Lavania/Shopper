import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";

export default function CartItems() {
  const { getTotalCartAmount, all_product, cartItems,addToCart, removeFromCart } =
    useContext(ShopContext);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This enables smooth scrolling
    });
  };
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Modify</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                {/* <img src={e.image} alt="" className="carticon-product-icon" /> */}
                <Link to={`/product/${e.id}`} onClick={handleScrollToTop}>
                  <img src={e.image} alt="" className="carticon-product-icon" />
                </Link>
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <div className=" cartitems-remove-icon">
                  <IoMdAdd className="btn" onClick={()=>addToCart(e.id)}/>
                  <IoMdRemove  className="btn"
                    onClick={() => removeFromCart(e.id)}/>
                </div>
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
