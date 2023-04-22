import { ArrowRight } from "@carbon/icons-react";
import { Button, PasswordInput } from "carbon-components-react";
import CarbonLink from "../CarbonLink";
import styles from "@/styles/LandingForm.module.scss";

interface LoginProps {
  handleClick: () => void;
  swtichLoginStep: (step: number) => void;
}

const LoginStep2 = (props: LoginProps) => {
  return (
    <div className={styles.loginForm}>
      <h2 style={{ marginBottom: 4 }}>Log in</h2>
      <h4 style={{ marginBottom: 40 }}>
        Logging in as username@ibm.com{" "}
        <CarbonLink
          onClick={() => props.swtichLoginStep(1)}
          className={styles.linkButton}
        >
          Not you?
        </CarbonLink>
      </h4>
      <div className={styles.divider} />
      <div className={styles.inputLabelContainer}>
        <p>Password</p>
        <p className={styles.inputLabelLink}>
          <CarbonLink
            href="https://www.ibm.com/account/reg/us-en/reset-password"
            target="_blank"
          >
            Forgot password?
          </CarbonLink>
        </p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <PasswordInput id="login-password" labelText="Password" hideLabel />
      </div>
      <Button
        kind="primary"
        renderIcon={ArrowRight}
        onClick={props.handleClick}
        className={styles.buttonContainer}
      >
        Log in
      </Button>
    </div>
  );
};
export default LoginStep2;
