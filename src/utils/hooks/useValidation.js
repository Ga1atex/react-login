import { useEffect, useState } from "react";

const useValidation = (value, validations) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    for (const validation of validations) {
      if (validation(value)) {
        setErrorMessage(validation(value));
        break;
      } else {
        setErrorMessage("");
      }
    }
  }, [value, validations]);

  return errorMessage;
};

export default useValidation;
