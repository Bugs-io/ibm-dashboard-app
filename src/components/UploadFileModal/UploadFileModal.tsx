import { useEffect, useState } from "react";
import { serverErrorMessages } from "@/utils/serverErrorMessages";
import { AxiosError } from "axios";
import {
  FileUploaderDropContainer,
  FileUploaderItem,
  Loading,
  Modal,
} from "carbon-components-react";
import useClient from "@/hooks/useClient";

interface Props {
  isActive: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleNotification: (success: boolean) => void;
  handleModalState: (state: boolean) => void;
}

interface Error {
  isInvalid: boolean;
  body: string;
  subject: string;
}

const REQUIRED_EXTENSION = "xlsx";

const EXTENSION_ERROR: Error = {
  isInvalid: false,
  body: "Invalide file format.",
  subject: "Please make sure to be using .xlsx file.",
};

const UploadFileModal = ({
  isActive,
  setOpen,
  handleNotification,
  handleModalState,
}: Props) => {
  const client = useClient();
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<Error>(EXTENSION_ERROR);
  const [isPrimaryButtonDisabled, setIsPrimaryButtonDisabled] =
    useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsPrimaryButtonDisabled(!(file && !error.isInvalid));
  }, [file]);

  const handleChangeFile = (
    e: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>,
    addedFilesObj: { addedFiles: File[] }
  ) => {
    const addedFile: File = addedFilesObj.addedFiles[0];
    const extension = addedFile.name.split(".").pop();

    const hasError = extension !== REQUIRED_EXTENSION;

    setError((prevError) => ({
      ...prevError,
      body: EXTENSION_ERROR.body,
      subject: EXTENSION_ERROR.subject,
      isInvalid: hasError,
    }));

    setFile(addedFile);
  };

  const handleClean = () => {
    setFile(undefined);
  };

  const handleSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file!);

    try {
      setIsLoading(true);

      await client.uploadInternalDataset(formData);

      setIsLoading(false);

      handleNotification(true);
      handleModalState(false);
      setFile(undefined);
    } catch (serverError) {
      setIsLoading(false);
      let errorMsg = "";
      if (serverError instanceof AxiosError) {
        const errorCode = serverError.response?.data.error_code;
        errorMsg =
          // @ts-expect-error
          serverErrorMessages.uploadFile[errorCode] ||
          serverErrorMessages.default;
      }
      setError((prevError) => ({
        ...prevError,
        subject: errorMsg,
        body: "Make sure the content of the file follows the correct format.",
        isInvalid: true,
      }));
    }
  };

  return (
    <Modal
      open={isActive}
      modalHeading="Upload the certifications data set."
      primaryButtonText="Upload"
      primaryButtonDisabled={isPrimaryButtonDisabled}
      onRequestSubmit={(e) => handleSubmit(e)}
      onRequestClose={() => {
        setOpen(false);
        handleClean();
      }}
      shouldSubmitOnEnter
    >
      <div className="cds--file__container">
        <p className="cds--file--label">
          Remember that uploading a new data set is going to upload the
          dashboard for everyone.
        </p>

        <p className="cds--label-description">
          Must be an .xlsx file with a maximum size of 600kb.
        </p>

        {file === undefined ? (
          <FileUploaderDropContainer
            style={{ marginBottom: 16 }}
            accept={[".xlsx"]}
            labelText="Drag and drop or click here to upload"
            name=""
            onAddFiles={(e, files) => handleChangeFile(e, files)}
          />
        ) : (
          <FileUploaderItem
            status="edit"
            name={file.name}
            style={{ backgroundColor: "#333333" }}
            onDelete={handleClean}
            errorSubject={error.subject}
            errorBody={error.body}
            invalid={error.isInvalid}
          />
        )}

        {isLoading && <Loading />}
      </div>
    </Modal>
  );
};

export default UploadFileModal;
