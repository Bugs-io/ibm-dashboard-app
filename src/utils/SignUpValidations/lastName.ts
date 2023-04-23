import { FormErrors } from "./types";

export const isLastNameValid = (
  lastName: string,
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
  let errorMessage = "";
  if (!lastName) {
    errorMessage = "Last name is required";
  }
  setFormErrors((prevFormErrors) => ({
    ...prevFormErrors,
    lastName: errorMessage,
  }));

  return errorMessage === "";
};
