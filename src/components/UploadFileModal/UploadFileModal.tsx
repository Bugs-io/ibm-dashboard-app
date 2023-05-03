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

const UploadFileModal = (props: Props) => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<Error>(EXTENSION_ERROR);
  const handleChangeFile = (
    e: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>,
    addedFilesObj: { addedFiles: File[] }
  ) => {
    const addedFile: File = addedFilesObj.addedFiles[0];
    const extension = addedFile.name.split(".").pop();

    const hasError = extension !== REQUIRED_EXTENSION ? true : false;

    setError((prevError) => ({
      ...prevError,
      isInvalid: hasError,
    }));

    setFile(addedFile);
  };

  const handleClean = () => {
    setFile(undefined);
  };

  return (
    <Modal
      open={props.isActive}
      modalHeading="Upload the certifications data set."
      primaryButtonText="Upload"
      onRequestSubmit={(e) => {
        e.preventDefault();
        console.log("TODO: upload");
      }}
      onRequestClose={() => {
        props.setOpen(false);
        handleClean();
      }}
      shouldSubmitOnEnter
    >
      <div className="cds--file__container">
        <p className="cds--file--label">
          Please provide the .xslx file to update the database that keep tracks
          of IBM's certifications, courses and badges.
        </p>

        <p className="cds--label-description">
          Max file size is 500kb. Supported file types are .jpg and .png.
        </p>

        {file === undefined ? (
          <FileUploaderDropContainer
            style={{ marginBottom: 16 }}
            accept={[".xlsx"]}
            labelText="Drag and drop or click here to upload"
            name=""
            onAddFiles={(e, files) => handleChangeFile(e, files)}
            tabIndex={0}
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
};

export default UploadFileModal;
