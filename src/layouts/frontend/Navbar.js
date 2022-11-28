import React from "react";
import { Link, useHistory } from "react-router-dom";

// import swal from 'sweetalert';
// import axios from 'axios';

function Navbar() {
  const history = useHistory();
  const logoutSubmit = (e) => {
    e.preventDefault();

    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_name");
    history.push("/");
  };

  var AuthButtons = "";
  var currentUser = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButtons = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    currentUser = localStorage.getItem("auth_name");
    AuthButtons = (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="#">
            {currentUser}
          </Link>
        </li>
        <li className="nav-item">
          <button
            type="button"
            onClick={logoutSubmit}
            className="nav-link btn btn-danger btn-sm text-white"
          >
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Website Book
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collections">
                Collection
              </Link>
            </li>

            {AuthButtons}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
