import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../Screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  let data = useCart();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between w-100">
              <div className="d-flex">
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                {localStorage.getItem("authToken") ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-5"
                      aria-current="page"
                      to="/myorders"
                    >
                      My Orders
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </div>
              <div className="d-flex">
                {/* <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-secondary  mx-1" to="/signup">
                  Signup
                </Link> */}
                {!localStorage.getItem("authToken") ? (
                  <>
                    <Link
                      className="btn bg-white text-success mx-1"
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className="btn btn-outline-secondary  mx-1"
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      className="btn cart bg-white text-success mx-3 position-relative"
                      // to="/cart"
                      onClick={() => {
                        setCartView(true);
                      }}
                    >
                      My Cart <i className="fa-solid fa-cart-shopping "></i>
                      {data.length > 0 ? (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {data.length}
                        </span>
                      ) : null}
                    </button>
                    {cartView ? (
                      <Modal
                        children={<Cart />}
                        onClose={() => {
                          setCartView(false);
                        }}
                      />
                    ) : null}
                    <Link
                      className="btn btn-outline-secondary mx-3"
                      to="/signup"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </>
                )}
              </div>
            </ul>
            {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}
