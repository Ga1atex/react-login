import React from "react";

const Alert = ({ message, className = "" }) => {
  let alertClassName = "alert mt-2";

  if (className) alertClassName += ` ${className}`;

  return (
    <div className={alertClassName} role="alert">
      {message}
    </div>
  );
};

export default Alert;
