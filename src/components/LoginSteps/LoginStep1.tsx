import { TextInput, Button, Checkbox } from "carbon-components-react";
import { ArrowRight } from "@carbon/icons-react";
import styles from "./loging-steps.module.scss";

import CarbonLink from "../CarbonLink";
interface LoginProps {
  switchLoginStep: (step: number) => void;
}

const LoginStep1 = (props: LoginProps) => {
  return (
    <div className={styles.loginForm}>
      <h2 style={{ marginBottom: 4 }}>Log in</h2>
      <h4 style={{ marginBottom: 40 }}>
        {`Don't have an account? `}{" "}
        <CarbonLink href="#" className={styles.linkButton}>
          Sign In
        </CarbonLink>
      </h4>
      <div className={styles.divider} />

      <div className={styles.inputLabelContainer}>
        <p>Continue with IBMid</p>
        <p className={styles.inputLabelLink}>
          <CarbonLink
            href="https://www.ibm.com/ibmid/myibm/help/us/helpdesk.html"
            target="_blank"
          >
            Forgot ID?
          </CarbonLink>
        </p>
      </div>
      <TextInput
        id="login-username"
        labelText=""
        placeholder="username@ibm.com"
        style={{ marginBottom: 16 }}
      />
      <div style={{ marginBottom: 16 }}>
        <Button
          kind="primary"
          renderIcon={ArrowRight}
          onClick={() => props.switchLoginStep(2)}
          className={styles.buttonContainer}
        >
          Continue
        </Button>
      </div>
      <Checkbox id="check-remember-id" labelText="Remember ID?" />
    </div>
  );
};

export default LoginStep1;
