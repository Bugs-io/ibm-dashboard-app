import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
} from "carbon-components-react";
import { Upload, Logout } from "@carbon/icons-react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import { UploadFileModal } from "../UploadFileModal";

import styles from "./styles.module.scss";

interface Props {
  handleNotification: (success: boolean) => void;
}

const Navbar = ({ handleNotification }: Props) => {
  const { clearAuth } = useAuthContext();
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);

  const logout = () => {
    clearAuth!();
  };

  const uploadFile = () => {
    setIsUploadFileModalOpen(true);
  };

  const handleModalState = (state: boolean) => {
    setIsUploadFileModalOpen(state);
  };

  return (
    <div>
      <Header aria-label="IBM Strategic Dashboard">
        <HeaderName prefix="IBM |">Strategic Dashboard</HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Upload file"
            className={styles.button}
            onClick={uploadFile}
          >
            <Upload />
          </HeaderGlobalAction>

          <div style={{ marginRight: 16 }}>
            <HeaderGlobalAction
              aria-label="Log Out"
              onClick={logout}
              tooltipAlignment="end"
            >
              <Logout />
            </HeaderGlobalAction>
          </div>
        </HeaderGlobalBar>
      </Header>

      <UploadFileModal
        isActive={isUploadFileModalOpen}
        setOpen={setIsUploadFileModalOpen}
        handleNotification={handleNotification}
        handleModalState={handleModalState}
      />
    </div>
  );
};

export default Navbar;
