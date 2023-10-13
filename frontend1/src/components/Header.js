import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation


const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark bg-gradient text-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          
        >
          
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item ">
              <a className="nav-link" href="#">
                <h6 className="text-light">About</h6>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3001/login">
              <h6 className="text-light">Login</h6>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3001/logout">
              <h6 className="text-light">Logout</h6>
              </a>
            </li>
          </ul>
        </div>
        {/* <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div> */}
      </nav>
    </header>
  );
};

export default Header;
