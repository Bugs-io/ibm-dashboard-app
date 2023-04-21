interface UserData {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

interface PasswordRequirements {
  hasMinLength: boolean;
  hasLetters: boolean;
  hasNumbers: boolean;
}

export const validateEmail = (
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
};

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

export const passwordStrengthMeter = (
  password: string,
  setPasswordRequirements: React.Dispatch<
    React.SetStateAction<PasswordRequirements>
  >
) => {
  const MIN_PASSWORD_LENGTH = 6;
  const checks = {
    length: false,
    number: false,
    letter: false,
  };

  if (password.length >= MIN_PASSWORD_LENGTH) {
    checks.length = true;
  }

  if (/[a-zA-Z]/.test(password)) {
    checks.letter = true;
  }

  if (/\d/.test(password)) {
    checks.number = true;
  }

  setPasswordRequirements((prevPasswordRequirements) => ({
    ...prevPasswordRequirements,
    hasMinLength: checks.length,
    hasLetters: checks.letter,
    hasNumbers: checks.number,
  }));
};

export const validatePassword = (
  password: string,
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
  let errorMessage = "";
  if (!password) {
    errorMessage = "Password is required";
  }
  setFormErrors((prevFormErrors) => ({
    ...prevFormErrors,
    password: errorMessage,
  }));
};
