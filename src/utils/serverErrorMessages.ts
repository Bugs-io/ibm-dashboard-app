interface ServerErrorMessages {
  [scope: string]:
    | {
        [errorKey: string]: string;
      }
    | string;
}

export const serverErrorMessages: ServerErrorMessages = {
  login: {
    INVALID_PASSWORD: "Invalid IBMid or password. Please try again.",
    USER_DOES_NOT_EXIST: "User not found.",
  },
  signup: {
    USER_ALREADY_EXISTS: "This user already exists.",
    INVALID_EMAIL: "Please use a valid IBMid.",
    USER_CREATION_ERROR: "There was an error while creating this account.",
  },
  uploadFile: {
    NO_FILE_UPLOADED: "No file was uploaded.",
    FAILED_PROCESSING_FILE: "Something went wrong!",
    INVALID_FILE_TYPE_ERROR:
      "Wrong format. Please make sure to provide a Excel file (.xlsx)",
    INTERNAL_DATASET_CREATION_ERROR: "Something went wrong!",
  },
  default: "Something went wrong.",
};
