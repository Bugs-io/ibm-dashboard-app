export interface UserData {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface PasswordRequirements {
  hasMinLength: boolean;
  hasLetters: boolean;
  hasNumbers: boolean;
}
