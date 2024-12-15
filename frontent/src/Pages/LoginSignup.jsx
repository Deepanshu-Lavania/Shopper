import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function LoginSignup() {
  const navigate =  useNavigate();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const signup = async () => {
    try {
      console.log("Signup function executed: ", formData);

      const res = await axios.post("http://localhost:8000/signup", formData);

      console.log(res);
      console.log("Signup data is: ", res.data);
      if (res.data) {
        localStorage.setItem("auth-token",res.data.token)
        alert("SignUp successfully!")
        navigate("/")
      }
      setFormData({
        username: "",
        password: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
    };

  const login = async () => {
    try {
      console.log("Login function executed: ", formData);
      const res = await axios.post("http://localhost:8000/login", formData);
      console.log("Login data is: ", res.data);
      if (res.data) {
        localStorage.setItem("auth-token",res.data.token)
        alert("Login successfully!")
        navigate("/")
        window.location.reload();
      }
      setFormData({
        password: "",
        email: "",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h2>{state}</h2>
        <div className="loginsignup-fields">
          {state === "SignUp" ? (
            <input
              name="username"
              value={formData.username}
              type="text"
              placeholder="Your Name"
              onChange={changeHandler}
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            type="email"
            placeholder="Email Address"
            onChange={changeHandler}
          />
          <input
            name="password"
            value={formData.password}
            type="password"
            placeholder="Password"
            onChange={changeHandler}
          />
        </div>

        <button
          onClick={() => {
            state === "SignUp" ? signup() : login();
          }}
        >
          Continue
        </button>

        {state === "SignUp" ? (
          <p className="loginsignup-login">
            Already have an account?
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?
            <span
              onClick={() => {
                setState("SignUp");
              }}
            >
              Click here
            </span>
          </p>
        )}
        <div className="loignsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy. </p>
        </div>
      </div>
    </div>
  );
}
