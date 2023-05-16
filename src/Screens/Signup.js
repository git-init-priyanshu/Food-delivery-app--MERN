import { React, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const funOnChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const funOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: details.name,
        email: details.email,
        password: details.password,
        location: details.location,
      }),
    });

    console.log(response);
    if (!response) {
      alert("Enter valid credentials");
    } else {
      console.log("Data successfully added to the database");
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <form className="container my-3">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            name="name"
            value={details.name}
            onChange={funOnChange}
          />
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={details.email}
            onChange={funOnChange}
          />
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={details.password}
            onChange={funOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Address"
            name="location"
            value={details.location}
            onChange={funOnChange}
          />
        </div>
        {/* <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button className="btn btn-success my-2" onClick={funOnSubmit}>
          Signup
        </button>
        <Link className="btn btn-outline-success my-2 mx-2" to="/login">
          Already a User
        </Link>
      </form>
    </>
  );
}
