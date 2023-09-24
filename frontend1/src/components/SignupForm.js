import authStore from "../stores/authStore";
import React, { useState, useEffect } from "react";
import logo from "./images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import image2 from "../components/images/music2.jpg";

export default function SignupForm() {
  const store = authStore();
  const navigate = useNavigate();

  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setformErrors(validate(store));
    setIsSubmit(true);
    await store.signup();
    navigate("/login");
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(store.signupForm);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    console.log(values);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!store.signupForm.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!store.signupForm.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!store.signupForm.birthday) {
      errors.birthday = "Birthday is required";
    }
    if (!store.signupForm.email) {
      errors.email = "Email is required";
    }
    // else if (!regex.test(values.email)) {
    //   errors.email = "This is not a valid email format!";
    // }
    if (!store.signupForm.password) {
      errors.password = "password is required";
    } else if (values.signupForm.password.length < 8) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.signupForm.password.length > 20) {
      errors.password = "Password cannot exceed more than 20 characters";
    }
    console.log(errors);
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
        className="login template d-flex 
      justify-content-center position-absolute
      align-items-center top-50 start-50 translate-middle 
      vh-100 bg-brimary"
      >
        <div className="form_container p-5 rounded ">
          <img className="App-logo mb-4" src={logo} alt="logo" />
          <h3 className="text-center mb-4">Sign Up</h3>
          <form onSubmit={handleSignup}>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="First Name"
                onChange={store.updateSignupForm}
                value={store.signupForm.firstName}
                type="text"
                name="firstName"
              />
            </div>
            <p className="text-warning">{formErrors.firstName}</p>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Last Name"
                onChange={store.updateSignupForm}
                value={store.signupForm.lastName}
                type="text"
                name="lastName"
              />
            </div>
            <p className="text-warning">{formErrors.lastName}</p>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Birthday"
                onChange={store.updateSignupForm}
                value={store.signupForm.birthday}
                type="date"
                name="birthday"
              />
            </div>
            <p className="text-warning">{formErrors.birthday}</p>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Enter Your Email"
                onChange={store.updateSignupForm}
                value={store.signupForm.email}
                type="email"
                name="email"
              />
            </div>
            <p className="text-warning">{formErrors.email}</p>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Enter the Password"
                onChange={store.updateSignupForm}
                value={store.signupForm.password}
                type="password"
                name="password"
              />
            </div>
            <p className="text-warning">{formErrors.password}</p>
            <div className="d-grid mb-2">
              <button className="btn btn-primary mb-4" type="submit">
                Register
              </button>
            </div>

            <div>
              If you already have an account <br />
              <p className="text-center mt-2">
                Click here to
                <Link to="/login" className="ms-2">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
