export interface UserData {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface PasswordRequirements {
  hasMinLength: boolean;
  hasLetters: boolean;
  hasNumbers: boolean;
}

export interface ServerErrorMessages {
  [key: string]: string;
};
