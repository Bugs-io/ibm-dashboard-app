import { TextInput, Button, Checkbox } from "carbon-components-react";
import { ArrowRight } from "@carbon/icons-react";

interface LoginProps {
  switchLoginStep: (step: number) => void;
}

const LoginStep1 = (props: LoginProps) => {
  return (
    <div className="login-form">
      <h2 style={{ marginBottom: 4 }}>Log in</h2>
      <p style={{ fontSize: 20, marginBottom: 40 }}>
        Don't have an account? <a href="#">Sign In</a>
      </p>
      <div className="divider" />
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 16 }}>Continue with IBMid</span>
        <a
          href="https://www.ibm.com/ibmid/myibm/help/us/helpdesk.html"
          target="_blank"
          style={{ float: "right" }}
        >
          Forgot ID?
        </a>
      </div>
      <TextInput
        id="login-username"
        labelText=""
        placeholder="username@ibm.com"
        style={{ marginBottom: 16 }}
      />
      <Button
        kind="primary"
        renderIcon={ArrowRight}
        style={{ marginBottom: 24 }}
        onClick={() => props.switchLoginStep(2)}
      >
        Continue
      </Button>
      <Checkbox id="check-remember-id" labelText="Remember ID?" />
    </div>
  );
};

export default LoginStep1;
