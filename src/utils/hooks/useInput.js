import { useEffect, useState } from "react";
import useValidation from "./useValidation";

const useInput = (initialValue = "", validations) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const errorMessage = useValidation(value, validations);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setIsTouched(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isTouched,
    errorMessage,
  };
};

export default useInput;
