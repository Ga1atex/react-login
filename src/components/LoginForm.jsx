import React, { useEffect, useState } from "react";
import { authAPI } from "../api/api";
import { maxLengthCreator, required } from "../utils/validators/validators";
import Alert from "./common/Alert/Alert";
import FormControl from "./common/FormControl/FormControl";
import "./LoginForm.css";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [requestSuccessMessage, setRequestSuccessMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target.userName.value;
    const password = e.target.password.value;

    if (!userName || !password) {
      setErrorMessage("Заполните все поля!");
      return;
    }

    setIsFetching(true);
    try {
      const response = await authAPI.login(userName, password);
      setRequestSuccessMessage(
        response.detail || "Положительный ответ с сервера"
      );
      localStorage.setItem("auth-data", JSON.stringify(response));
    } catch (error) {
      setErrorMessage(
        error.detail || error.title || error.message || "Error has occured!"
      );
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (requestSuccessMessage) setErrorMessage("");
  }, [requestSuccessMessage]);

  useEffect(() => {
    if (errorMessage) setRequestSuccessMessage("");
  }, [errorMessage]);

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
          {requestSuccessMessage && (
            <Alert
              className="alert-success"
              message={requestSuccessMessage}
            ></Alert>
          )}
          {errorMessage && (
            <Alert className="alert-danger" message={errorMessage}></Alert>
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
