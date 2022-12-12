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
    history.push("/login");
    window.location.reload();
  };

  var AuthButtons = "";
  var currentUser = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButtons = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
      </ul>
    );
  } else {
    currentUser = localStorage.getItem("auth_name");
    AuthButtons = (
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {currentUser}<i className="fas fa-user fa-fw"></i>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><Link to="#" className="dropdown-item" onClick={logoutSubmit}>Logout</Link></li>
                  <li><Link to={'change_password'} className="dropdown-item">Change Password</Link></li>
              </ul>
          </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
        <div className="container">

            <Link className="navbar-brand" to="#">Website Book</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
