import { ArrowRight } from "@carbon/icons-react";
import { Button, Form, TextInput } from "carbon-components-react";
import CarbonLink from "../CarbonLink";
import styles from "@/styles/LandingForm.module.scss";
import utilStyle from "@/styles/utils.module.scss";

interface Props {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  switchLoginStep: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputError: string;
  loginData: { email: string; password: string };
}

const LoginStep2 = (props: Props) => {
  return (
    <div className={styles.loginForm}>
      <h2 style={{ marginBottom: 4 }}>Log in</h2>
      <h4 style={{ marginBottom: 40, wordWrap: "break-word" }}>
        Logging in as{" "}
        <span className={utilStyle.bold}>{`${props.loginData.email} `}</span>
        <CarbonLink
          onClick={() => props.switchLoginStep()}
          className={styles.linkButton}
        >
          Not you?
        </CarbonLink>
      </h4>

      <div className={styles.divider} />
      <Form>
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
              name="password"
              value={props.loginData.password}
              labelText="Password"
              hideLabel
              onChange={(e) => props.handleChange(e)}
              invalid={props.inputError !== ""}
              invalidText={props.inputError}
            />
          </div>
        </div>
        <Button
          kind="primary"
          renderIcon={ArrowRight}
          onClick={(e) => props.handleSubmit(e)}
          className={styles.buttonContainer}
          type="submit"
        >
          Log in
        </Button>
      </Form>
    </div>
  );
};
export default LoginStep2;
