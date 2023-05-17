import useClient from "@/hooks/useClient";
import {
  FileUploaderDropContainer,
  FileUploaderItem,
  Modal,
} from "carbon-components-react";
import { useEffect, useState } from "react";

interface Props {
  isActive: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

function UploadFileModal({ isActive, setOpen }: Props) {
  const client = useClient();

  const [file, setFile] = useState<File>();
  const [error, setError] = useState<Error>(EXTENSION_ERROR);
  const [isPrimaryButtonDisabled, setIsPrimaryButtonDisabled] =
    useState<Boolean>(true);

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

    const res = await client.uploadInternalDataset(formData);
    console.log(res);
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
      </div>
    </Modal>
  );
}

export default UploadFileModal;
