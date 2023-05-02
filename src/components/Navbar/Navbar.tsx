import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  Button,
} from "carbon-components-react";
import { Upload, Logout } from "@carbon/icons-react";

import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import { useEffect } from "react";

const Navbar = () => {
  const { clearAuth, isLoadingAuth } = useAuthContext();
  const router = useRouter();

  const logout = async () => {
    await clearAuth!();
  };

  return (
    <div>
      <Header aria-label="IBM Strategic Dashboard">
        <HeaderName prefix="IBM |">Strategic Dashboard</HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Upload file"
            className={styles.button}
          >
            <Upload />
          </HeaderGlobalAction>

          <HeaderGlobalAction aria-label="Log Out" onClick={logout}>
            <Logout />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    </div>
  );
};

export default Navbar;
