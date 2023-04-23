import { TextInput, Button, Checkbox } from "carbon-components-react";
import { ArrowRight } from "@carbon/icons-react";
import styles from "@/styles/LandingForm.module.scss";

import CarbonLink from "../CarbonLink";
import { UserData } from "@/utils/SignUpValidations/types";

interface Props {
  handleClick: () => void;
  handleChange: (field: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  inputError: string;
  loginData: UserData;
}

const LoginStep1 = (props: Props) => {
  return (
    <div className={styles.loginForm}>
      <h2 style={{ marginBottom: 4 }}>Log in</h2>
      <h4 style={{ marginBottom: 40 }}>
        Don't have an account?{" "}
        <CarbonLink href="/signup" className={styles.linkButton}>
          Sign up
        </CarbonLink>
      </h4>

      <div className={styles.divider} />

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
          id="login-username"
          value={props.loginData.email}
          labelText=""
          placeholder="username@ibm.com"
          onChange={(e) => props.handleChange("email", e)}
          invalid={props.inputError !== ""}
          invalidText={props.inputError}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button
          kind="primary"
          renderIcon={ArrowRight}
          onClick={() => props.handleClick()}
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
