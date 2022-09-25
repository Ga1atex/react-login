import React from "react";
import useInput from "../../../utils/hooks/useInput";
import "./FormControl.css";

const FormControl = (props) => {
  const { placeholder, type, validators, ...restProps } = props;

  const { errorMessage, isTouched, ...inputProps } = useInput("", validators);

  const hasError = isTouched && errorMessage;

  return (
    <>
      <input
        className={[
          "form-control mt-1",
          hasError ? "form-control-error" : "",
        ].join(" ")}
        placeholder={placeholder}
        type={type}
        {...inputProps}
        {...restProps}
      />
      {hasError && <div className="error-message">{errorMessage}</div>}
    </>
  );
};

export default FormControl;
