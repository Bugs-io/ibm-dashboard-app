import { FormErrors } from "./types";

export const validateLastName = (
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
};
