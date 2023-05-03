import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  Button,
} from "carbon-components-react";
import { Upload, Logout } from "@carbon/icons-react";
import UploadFileModal from "../UploadFileModal";

import { useAuthContext } from "@/contexts/AuthContext";

import styles from "./styles.module.scss";
import { useState } from "react";

const Navbar = () => {
  const { clearAuth } = useAuthContext();
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);

  const logout = async () => {
    await clearAuth!();
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

          <HeaderGlobalAction aria-label="Log Out" onClick={logout}>
            <Logout />
          </HeaderGlobalAction>
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
