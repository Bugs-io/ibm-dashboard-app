interface FormErrors {
  [key: string]: string;
}

interface PasswordRequirements {
  hasMinLength: boolean;
  hasLetters: boolean;
  hasNumbers: boolean;
}

export const validatePassword = (
  password: string,
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>,
  setPasswordRequirements: React.Dispatch<
    React.SetStateAction<PasswordRequirements>
  >
) => {
  let errorMessage = "";
  if (!password) {
    errorMessage = "Password is required";
  } else if (isPasswordStrong(password, setPasswordRequirements) === false) {
    errorMessage = "Invalid password (not strong enough)";
  }

  setFormErrors((prevFormErrors) => ({
    ...prevFormErrors,
    password: errorMessage,
  }));
};

export const isPasswordStrong = (
  password: string,
  setPasswordRequirements: React.Dispatch<
    React.SetStateAction<PasswordRequirements>
  >
): boolean => {
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

  return checks.length && checks.letter && checks.number;
};
