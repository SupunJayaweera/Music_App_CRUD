import "../App.css";
import logo from "./images/logo1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import LoginPage from "../pages/LoginPage";
import SongsPage from "../pages/SongsPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";




function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <div className="position-absolute 
        top-0 start-0 p-1">
          <button className="btn">
            <Link className="link-dark" to="/">
              <img className="App-logo mb-4 "
               style={{ width: "100px", height: "100px", float: "left" }} 
               src={logo} alt="logo" />
            </Link>
          </button>
        </div>

        {/* <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li> */}
        <div className="position-absolute top-0 end-0 p-4">
          <button className="btn btn-danger ">
            <Link className="link-light" to="/logout">
              Logout
            </Link>
          </button>
        </div>

        <Routes>
          <Route
            index
            element={
              <RequireAuth>
                <SongsPage />
              </RequireAuth>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
