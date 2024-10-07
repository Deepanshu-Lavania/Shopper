import React, {useState}  from "react";

import "./Navbar.css";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import { Link } from "react-router-dom";
export default function Navbar() {
    const [menu, setMenu] = useState("");
    const linkStyle={
      textDecoration:"none"
    }
  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>SHOPPER</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>setMenu("Shop")}><Link style={linkStyle} to="/">Shop</Link> {menu==="Shop" && <hr/>}</li>
            <li onClick={()=>setMenu("Men")}><Link style={linkStyle} to="/mens">Men</Link>  {menu==="Men" && <hr/>}</li>
            <li onClick={()=>setMenu("Women")} ><Link style={linkStyle} to="/womens">Women</Link> {menu==="Women" && <hr/>}</li>
            <li onClick={()=>setMenu("Kid")} ><Link style={linkStyle} to="/kids">Kid</Link> {menu==="Kid" && <hr/>}</li>
        </ul>
        <div className="nav-login-cart">
            <button><Link style={linkStyle} to='/login'>Login</Link></button>
            <Link style={linkStyle} to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">0</div>
        </div>
      </div>
    </>
  );
}
