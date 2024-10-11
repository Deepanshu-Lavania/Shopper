import React, {useContext, useRef, useState}  from "react";

import "./Navbar.css";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import arrow_icon from "../../assets/breadcrum_arrow.png";

export default function Navbar() {
    const [menu, setMenu] = useState("");
    const menuRef = useRef();
    const dropdown_toggle = (e)=>{
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }
    const linkStyle={
      textDecoration:"none"
    }
    const {getTotalCartItems} = useContext(ShopContext);
  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>SHOPPER</p>
        </div>
        <img className="nav-dropdown" onClick={dropdown_toggle} src={arrow_icon} alt="dorpDown-image" />
        <ul ref={menuRef}  className="nav-menu">
            <li onClick={()=>setMenu("Shop")}><Link style={linkStyle} to="/">Shop</Link> {menu==="Shop" && <hr/>}</li>
            <li onClick={()=>setMenu("Men")}><Link style={linkStyle} to="/mens">Men</Link>  {menu==="Men" && <hr/>}</li>
            <li onClick={()=>setMenu("Women")} ><Link style={linkStyle} to="/womens">Women</Link> {menu==="Women" && <hr/>}</li>
            <li onClick={()=>setMenu("Kid")} ><Link style={linkStyle} to="/kids">Kid</Link> {menu==="Kid" && <hr/>}</li>
        </ul>
        <div className="nav-login-cart">
            <button><Link style={linkStyle} to='/login'>Login</Link></button>
            <Link style={linkStyle} to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
    </>
  );
}
