import { FormErrors } from "./types";

export const isEmailValid = (
  email: string,
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
  let errorMessage = "";

  if (!email) {
    errorMessage = "E-mail is required";
  } else if (
    !/^\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\s*$/.test(email)
  ) {
    errorMessage = "Invalid format (suggested: name@company.com)";
  } else {
    errorMessage = "";
  }

  setFormErrors((prevFormErrors) => ({
    ...prevFormErrors,
    email: errorMessage,
  }));

  return errorMessage === "";
};
