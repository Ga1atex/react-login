import React, { useState } from "react";
import { authAPI } from "../api/api";
import styles from "./LoginForm.css";

const LoginForm = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login({
        username: userName,
        password,
      });
    } catch (error) {
      console.log(typeof error);
      setErrorMessage(JSON.stringify(error));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <div className="form-group">
            <label htmlFor="userName">Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="userName"
              value={userName}
              onChange={handleUserName}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {errorMessage && (
            <div className="">
              <div>{errorMessage}</div>
            </div>
          )}

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
