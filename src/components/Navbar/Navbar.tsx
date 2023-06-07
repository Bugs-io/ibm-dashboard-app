import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
} from "carbon-components-react";
import { Upload, Logout } from "@carbon/icons-react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import UploadFileModal from "../UploadFileModal";

import styles from "./styles.module.scss";

const Navbar = () => {
  const { clearAuth } = useAuthContext();
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);

  const logout = () => {
    clearAuth!();
  };

  const uploadFile = () => {
    setIsUploadFileModalOpen(true);
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
      />
    </div>
  );
};

export default Navbar;
