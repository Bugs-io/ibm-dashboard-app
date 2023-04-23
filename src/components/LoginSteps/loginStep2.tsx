import { ArrowRight } from "@carbon/icons-react";
import { Button, PasswordInput, TextInput } from "carbon-components-react";
import CarbonLink from "../CarbonLink";
import styles from "@/styles/LandingForm.module.scss";

interface Props {
  handleClick: () => void;
  switchLoginStep: () => void;
  handleChange: (field: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  loginData: { email: string; password: string };
}

const LoginStep2 = (props: Props) => {
  return (
    <div className={styles.loginForm}>
      <h2 style={{ marginBottom: 4 }}>Log in</h2>
      <h4 style={{ marginBottom: 40, wordWrap: "break-word" }}>
        Logging in as {`${props.loginData.email} `}
        <CarbonLink
          onClick={() => props.switchLoginStep()}
          className={styles.linkButton}
        >
          Not you?
        </CarbonLink>
      </h4>

      <div className={styles.divider} />
      <div className={styles.form}>
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
          <TextInput.PasswordInput
            id="login-password"
            value={props.loginData.password}
            labelText="Password"
            hideLabel
            onChange={(e) => props.handleChange("password", e)}
          />
        </div>
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
