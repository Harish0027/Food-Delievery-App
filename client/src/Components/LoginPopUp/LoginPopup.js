import React, { useState, useContext } from "react";
import { storeContext } from "../../Context/StoreContext"; 
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setIsLogin }) => {
  const { setToken } = useContext(storeContext); 
  const [currState, setCurrState] = useState("Sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:3004/api/user/register", {
        name,
        email,
        password,
      });
      if (res.data.success === true) {
        toast.success(res.data.message);
        setCurrState("login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3004/api/user/login", {
        email,
        password,
      });
      if (res.data.success === true) {
        toast.success(res.data.message);
        setToken(res.data.token); 
        localStorage.setItem("user", res.data.token);
        setIsLogin(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currState === "Sign up") {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="login-popUp">
      <form className="login-popUp-container" onSubmit={handleSubmit}>
        <div className="login-popUp-title">
          <h2>{currState}</h2>
          <img
            onClick={() => {
              setIsLogin(false);
            }}
            src={assets.cross_icon}
            alt="cancel"
          />
        </div>
        <div className="login-popUp-inputs">
          {currState === "login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your name"
              className="login-popUp-inputs-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Your email"
            className="login-popUp-inputs-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            className="login-popUp-inputs-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button>{currState === "Sign up" ? "Create Account" : "Log In"}</button>
        <div className="login-popUp-terms">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms and conditions</p>
        </div>
        {currState === "login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("login")}>Log in here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
