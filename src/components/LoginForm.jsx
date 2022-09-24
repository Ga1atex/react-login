import React, { useState } from "react";
import { authAPI } from "../api/api";
import { maxLengthCreator, required } from "../utils/validators/validators";
import FormControl from "./common/FormControl";
import "./LoginForm.css";

const LoginForm = () => {
  const [errorFetchMessage, setErrorFetchMessage] = useState({
    isError: false,
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target.userName.value;
    const password = e.target.password.value;

    if (!userName || !password) {
      setErrorFetchMessage({ isError: true, message: "Заполните все поля!" });
      return;
    }

    setIsFetching(true);
    try {
      const response = await authAPI.login(userName, password);
      setSuccessMessage("Тут должен быть положительный ответ с сервера");
      setErrorFetchMessage({ isError: false, message: "" });
      localStorage.setItem("auth-data", JSON.stringify(response.data?.detail));
    } catch (error) {
      setErrorFetchMessage({
        isError: true,
        message: error.response.data?.detail || error.message,
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="auth-form">
      <form className="auth-form__container" onSubmit={handleSubmit}>
        <div className="auth-form__content">
          <div className="form-group">
            <label className="form-label" htmlFor="userName">
              Email address
            </label>
            <FormControl
              type="email"
              placeholder="Enter email"
              name="userName"
              id="userName"
              validators={[maxLengthCreator(20), required]}
            />
          </div>
          <div className="form-group mt-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <FormControl
              type="password"
              placeholder="Enter password"
              name="password"
              id="password"
              validators={[maxLengthCreator(20), required]}
            />
          </div>
          {!errorFetchMessage.isError && successMessage && (
            <div className="alert alert-success mt-2" role="alert">
              {successMessage}
            </div>
          )}
          {errorFetchMessage.isError && (
            <div className="alert alert-danger mt-2" role="alert">
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
