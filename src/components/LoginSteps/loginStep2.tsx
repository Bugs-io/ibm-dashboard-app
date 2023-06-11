import { ArrowRight } from "@carbon/icons-react";
import {
  Button,
  Form,
  TextInput,
  InlineLoading,
  InlineLoadingStatus,
} from "carbon-components-react";
import styles from "@/styles/LandingForm.module.scss";
import utilStyle from "@/styles/utils.module.scss";
import loginStyles from "./style.module.scss";
import CarbonLink from "../CarbonLink";

interface Props {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  switchLoginStep: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputError: string;
  loginData: { email: string; password: string };
  loadingStatus: InlineLoadingStatus | undefined;
}

const LoginStep2 = ({
  loginData,
  handleChange,
  handleSubmit,
  inputError,
  loadingStatus,
  switchLoginStep,
}: Props) => (
  <div className={styles.loginForm}>
    <h2 className={loginStyles.title}>Log in</h2>
    <h4 className={loginStyles.subtitleStep2}>
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
          <p>Log in</p>
          <InlineLoading
            className={loginStyles.loading}
            status={loadingStatus}
          />
        </div>
      </Button>
    </Form>
  </div>
);
export default LoginStep2;
