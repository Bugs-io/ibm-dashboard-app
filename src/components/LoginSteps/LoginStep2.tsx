import { ArrowRight } from "@carbon/icons-react";
import {
  Button,
  Checkbox,
  TextInput,
  PasswordInput,
} from "carbon-components-react";

interface LoginProps {
  handleClick: () => void;
  swtichLoginStep: (step: number) => void;
}

const LoginStep2 = (props: LoginProps) => {
  return (
    <div className="login-form">
      <h2 style={{ marginBottom: 4 }}>Log in</h2>
      <p style={{ fontSize: 20, marginBottom: 40 }}>
        Logging in as username@ibm.com{" "}
        <a style={{cursor: "pointer"}} onClick={() => props.swtichLoginStep(1)}>
          Not you?
        </a>
      </p>
      <div className="divider" />
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>Password</p>
        <a
          href="https://www.ibm.com/account/reg/us-en/reset-password"
          target="_blank"
          style={{ textAlign: "end" }}
        >
          Forgot password?
        </a>
      </div>
      <div style={{ marginBottom: 16 }}>
        <PasswordInput id="login-password" labelText="Password" hideLabel />
      </div>
      <Button
        kind="primary"
        renderIcon={ArrowRight}
        style={{ marginBottom: 24 }}
        onClick={props.handleClick}
      >
        Log in
      </Button>
      <Checkbox id="check-remember-id" labelText="Remember ID?" />
    </div>
  );
};
export default LoginStep2;
