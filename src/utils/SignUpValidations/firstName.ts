import { FormErrors } from "./types";

export const validateFirstName = (
  firstName: string,
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
  let errorMessage = "";
  if (!firstName) {
    errorMessage = "First name is required";
  }
  setFormErrors((prevFormErrors) => ({
    ...prevFormErrors,
    firstName: errorMessage,
  }));
};
