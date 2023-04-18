import { ReactNode } from "react";
import { Theme, Grid, Column } from "carbon-components-react";

import styles from "./LandingLayout.module.scss";

interface props {
  children: ReactNode;
}
const LandingLayout = ({ children }: props) => {
  return (
    <Theme theme="g100" className={styles.loginPage}>
      <Grid fullWidth className={styles.gridLayout}>
        <Column className={styles.sidebar} sm={4} md={5} lg={6}>
          {children}
        </Column>
      </Grid>
    </Theme>
  );
};

export default LandingLayout;