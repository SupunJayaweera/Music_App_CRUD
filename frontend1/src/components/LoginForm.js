import React, { useState, useEffect } from "react";
import logo from "./images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";
import "./style.css";
import image2 from "../components/images/music2.jpg";

export default function LoginForm() {
  const store = authStore();
  const navigate = useNavigate();

  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setformErrors(validate(store));
    setIsSubmit(true);
    await store.login();

    //Navigate
    navigate("/");
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(store.loginForm);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!store.loginForm.email) {
      errors.email = "Email is required";
    }
    // else if (!regex.test(values.email)) {
    //   errors.email = "This is not a valid email format!";
    // }
    if (!store.loginForm.password) {
      errors.password = "password is required";
    }
    //  else if (values.password.length < 4) {
    //   errors.password = "Password must be more than 4 characters";
    // } else if (values.password.length > 20) {
    //   errors.password = "Password cannot exceed more than 20 characters";
    // }
    return errors;
  };

  return (
    <div
      className="has-bg-img"
      style={{
        backgroundImage: `url(${image2})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh", // Set the height of the container to the full viewport height
      }}
    >
      <div
        className="login template d-flex justify-content-center align-items-center
     vh-100 bg-brimary position-absolute top-50 start-50 translate-middle"
      >
        <div className="form_container p-5 rounded bg-white">
          <img className="App-logo mb-4" src={logo} alt="logo" />
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-2">
              <input
                onChange={store.updateLoginForm}
                value={store.loginForm.email}
                className="form-control"
                placeholder="Enter Your Email"
                type="email"
                name="email"
              />
            </div>
            <p className="text-warning">{formErrors.email}</p>
            <div className="mb-2">
              <input
                className="form-control"
                onChange={store.updateLoginForm}
                value={store.loginForm.password}
                placeholder="Enter the Password"
                type="password"
                name="password"
              />
            </div>
            <p className="text-warning">{formErrors.password}</p>
            <div className="d-grid">
              <button className="btn btn-primary mb-4" type="submit">
                Login
              </button>
            </div>
            <div>
              If you don't have an account? <br />
              <p className="text-center mt-2">
                Click here to
                <Link to="/signup" className="ms-2">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
