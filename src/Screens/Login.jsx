import { React, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const funOnChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const funOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginDetails.email,
        password: loginDetails.password,
      }),
    });

    const json = await response.json();
    if (!response) {
      alert("Enter valid credentials");
    } else {
      localStorage.setItem("userEmail", loginDetails.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }

    // if(!json.success)
  };

  return (
    <>
      <Navbar />
      <form className="container my-3">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={loginDetails.email}
            onChange={funOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={loginDetails.password}
            onChange={funOnChange}
          />
        </div>
        <button className="btn btn-success my-2" onClick={funOnSubmit}>
          Login
        </button>
        <Link className="btn btn-outline-success my-2 mx-2" to="/signup">
          I'am a new user
        </Link>
      </form>
    </>
  );
}
