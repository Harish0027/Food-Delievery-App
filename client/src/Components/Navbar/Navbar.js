import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from "../../Context/StoreContext";

const CustomNavbar = ({ setIsLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, setToken, token } = useContext(storeContext);
  const navigate = useNavigate();


  const handleLogOut = () => {
    localStorage.removeItem("user");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo-link">
        <img src={assets.logo} alt="logo" className="logo" />
        
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            className={menu === "home" ? "active" : ""}
            onClick={() => setMenu("home")}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            className={menu === "menus" ? "active" : ""}
            onClick={() => setMenu("menus")}
            href="#explore-menu"
          >
            Menu
          </a>
        </li>
        <li>
          <a
            className={menu === "mobile" ? "active" : ""}
            onClick={() => setMenu("mobile")}
            href="#app-download"
          >
            Mobile App
          </a>
        </li>
        <li>
          <a
            className={menu === "contact" ? "active" : ""}
            onClick={() => setMenu("contact")}
            href="#footer"
          >
            Contact Us
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search icon" />
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            {" "}
            <img src={assets.basket_icon} alt="cart" />
          </Link>

          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setIsLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="navbar-profile-dropdown">
              <li onClick={()=>{navigate("/myorders")}}>
                
                <img src={assets.bag_icon} alt="profile" />
                order
              </li>
              <li onClick={handleLogOut}>
                <img src={assets.logout_icon} alt="profile" />
                logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomNavbar;
