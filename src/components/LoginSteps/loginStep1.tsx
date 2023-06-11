import { TextInput, Button, Form } from "carbon-components-react";
import { ArrowRight } from "@carbon/icons-react";
import styles from "@/styles/LandingForm.module.scss";
import { UserData } from "@/utils/SignUpValidations/types";
import loginStyles from "./style.module.scss";
import CarbonLink from "../CarbonLink";

interface Props {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputError: string;
  loginData: UserData;
}

const LoginStep1 = ({
  loginData,
  handleChange,
  handleSubmit,
  inputError,
}: Props) => (
  <div className={styles.loginForm}>
    <h2 className={loginStyles.title}>Log in</h2>
    <h4 className={loginStyles.subtitle}>
      Don&apos;t have an account?{" "}
      <CarbonLink href="/signup" className={styles.linkButton}>
        Sign up
      </CarbonLink>
    </h4>

    <div className={styles.divider} />
    <Form>
      <div className={styles.form}>
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
          id="login-email"
          name="email"
          value={loginData.email}
          labelText=""
          placeholder="username@ibm.com"
          onChange={(e) => handleChange(e)}
          invalid={inputError !== ""}
          invalidText={inputError}
        />
      </div>
      <div>
        <Button
          kind="primary"
          renderIcon={ArrowRight}
          onClick={(e) => handleSubmit(e)}
          className={`${styles.buttonContainer} ${loginStyles.submitButton}`}
          type="submit"
        >
          Continue
        </Button>
      </div>
    </Form>
  </div>
);

export default LoginStep1;
