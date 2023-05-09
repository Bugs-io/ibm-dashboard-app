import useClient from "@/hooks/useClient";
import axios from "axios";
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
  const client = useClient();

  const [file, setFile] = useState<File>();
  const [error, setError] = useState<Error>(EXTENSION_ERROR);
  const [isPrimaryButtonDisabled, setIsPrimaryButtonDisabled] =
    useState<Boolean>(true);

  useEffect(() => {
    setIsPrimaryButtonDisabled(file && !error.isInvalid ? false : true);
  }, [file]);

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
      open={props.isActive}
      modalHeading="Upload the certifications data set."
      primaryButtonText="Upload"
      primaryButtonDisabled={isPrimaryButtonDisabled}
      onRequestSubmit={(e) => handleSubmit(e)}
      onRequestClose={() => {
        props.setOpen(false);
        handleClean();
      }}
      shouldSubmitOnEnter
    >
      <div className="cds--file__container">
        <p className="cds--file--label">
          Please provide the file to update the database that keeps track of
          IBM's certifications, courses and badges.
        </p>

        <p className="cds--label-description">
          Format must be .xlsx with a maximum size of 500kb.
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
};

export default UploadFileModal;
