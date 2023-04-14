import { TextInput, Button, Checkbox, Grid } from "carbon-components-react";
import { ArrowRight } from "@carbon/icons-react";

interface LoginProps {
  switchLoginStep: (step: number) => void;
}

const LoginStep1 = (props: LoginProps) => {
  return (
    <div className="login-form">
      <h2 style={{ marginBottom: 4 }}>Log in</h2>
      <p style={{ fontSize: 20, marginBottom: 40 }}>
        {`Don't have an account?`} <a href="#">Sign In</a>
      </p>
      <div className="divider" />
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>Continue with IBMid</p>
        <p style={{ marginLeft: 16, textAlign: "end" }}>
          <a
            href="https://www.ibm.com/ibmid/myibm/help/us/helpdesk.html"
            target="_blank"
          >
            Forgot ID?
          </a>
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
          style={{ minWidth: "100%" }}
        >
          Continue
        </Button>
      </div>
      <Checkbox id="check-remember-id" labelText="Remember ID?" />
    </div>
  );
};

export default LoginStep1;
