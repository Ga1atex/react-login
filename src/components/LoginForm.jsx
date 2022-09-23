import React, { useState } from "react";
import { authAPI } from "../api/api";
import "./LoginForm.css";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorFetchMessage, setErrorFetchMessage] = useState({
    isError: false,
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setErrorFetchMessage("Заполните все поля!");
      return;
    }

    setIsFetching(true);
    try {
      const response = await authAPI.login({
        username: userName,
        password,
      });

      if (response.status === 401) {
        setErrorFetchMessage({ isError: true, message: response.detail });
      } else if (response.status === 403) {
        setErrorFetchMessage({
          isError: true,
          message: "Access is restricted",
        });
      } else if (response.status === 500) {
        setErrorFetchMessage({ isError: true, message: "Server error" });
      } else {
        setSuccessMessage("Тут должен быть положительный ответ с сервера");
        setErrorFetchMessage({ isError: false, message: "" });
      }
    } catch (error) {
      setErrorFetchMessage(JSON.stringify(error));
    } finally {
      setIsFetching(false);
    }
  };

  const handleUserName = (e) => {
    setUserName(e.target.value.trim());
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
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
          {successMessage && (
            <div class="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorFetchMessage.isError && (
            <div className="alert alert-danger mt-2">
              {errorFetchMessage.message || "Error has occured!"}
            </div>
          )}

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              {isFetching ? (
                <>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
