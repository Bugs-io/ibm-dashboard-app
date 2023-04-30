import { ArrowRight } from "@carbon/icons-react";
import {
  Button,
  Form,
  TextInput,
  InlineLoading,
} from "carbon-components-react";
import styles from "@/styles/LandingForm.module.scss";
import utilStyle from "@/styles/utils.module.scss";
import CarbonLink from "../CarbonLink";

interface Props {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  switchLoginStep: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputError: string;
  loginData: { email: string; password: string };
  loadingStatus: string | undefined;
}

function LoginStep2(props: Props) {
  const {
    loginData,
    inputError,
    loadingStatus,
    handleSubmit,
    handleChange,
    switchLoginStep
  } = props;

  return (
    <div className={styles.loginForm}>
      <h2 style={{ marginBottom: 4 }}>Log in</h2>
      <h4 style={{ marginBottom: 40, wordWrap: "break-word" }}>
        Logging in as{" "}
        <span className={utilStyle.bold}>{`${loginData.email} `}</span>
        <CarbonLink
          onClick={() => switchLoginStep()}
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

          <div>
            <TextInput.PasswordInput
              id="login-password"
              name="password"
              value={loginData.password}
              labelText="Password"
              hideLabel
              onChange={(e) => handleChange(e)}
              invalid={inputError !== ""}
              invalidText={inputError}
              autoFocus
            />
          </div>
        </div>
        <Button
          kind="primary"
          renderIcon={ArrowRight}
          onClick={(e) => handleSubmit(e)}
          className={styles.buttonContainer}
          type="submit"
        >
          <div className={styles.buttonContent}>
            <p>Log in </p>
            <InlineLoading style={{ width: "auto" }} status={loadingStatus} />
          </div>
        </Button>
      </Form>
    </div>
  );
}
export default LoginStep2;
