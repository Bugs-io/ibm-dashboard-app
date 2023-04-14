import {
  Theme,
  Grid,
  Column,
  TextInput,
  Button,
  Checkbox,
  PasswordInput,
} from "carbon-components-react";

import { ArrowRight } from "@carbon/icons-react";
import { useState } from "react";

interface LoginProps {
  handleClick: () => void;
}

const LoginStep1 = (props: LoginProps) => {
  return (
    <div className="login-form">
      <h2 style={{ marginBottom: 4 }}>Log in</h2>
      <p style={{ fontSize: 20, marginBottom: 40 }}>
        Don't have an account? <a href="">Sign In</a>
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
        onClick={props.handleClick}
      >
        Continue
      </Button>
      <Checkbox id="check-remember-id" labelText="Remember ID?" />
    </div>
  );
};

const LoginStep2 = (props: LoginProps) => {
  return (
    <div className="login-form">
      <h2 style={{ marginBottom: 4 }}>Log in</h2>
      <p style={{ fontSize: 20, marginBottom: 40 }}>
        Logging in as username@ibm.com <a href="">Not you?</a>
      </p>
      <div className="divider" />
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 16 }}>Password</span>
        <a
          href="https://www.ibm.com/ibmid/myibm/help/us/helpdesk.html"
          target="_blank"
          style={{ float: "right" }}
        >
          Forgot password?
        </a>
      </div>
      <PasswordInput
        id="login-password"
        labelText=""
        style={{ marginBottom: 16 }}
      />
      <Button
        kind="primary"
        renderIcon={ArrowRight}
        style={{ marginBottom: 24 }}
        onClick={props.handleClick}
      >
        Continue
      </Button>
      <Checkbox id="check-remember-id" labelText="Remember ID?" />
    </div>
  );
};

const Login = () => {
  const [loginStep2, setLoginStep2] = useState(false);
  const handleContinue = () => {
    setLoginStep2((prevLoginStep2) => !prevLoginStep2);
  };

  const handleLogin = () => {
    console.log("TODO: Log In");
  };

  return (
    <Theme theme="g100" className="login-page">
      <Grid fullWidth style={{ margin: 0, padding: 0 }}>
        <Column className="sidebar" sm={4} md={3} lg={6} style={{ margin: 0 }}>
          {loginStep2 ? (
            <LoginStep2 handleClick={handleContinue}></LoginStep2>
          ) : (
            <LoginStep1 handleClick={handleLogin} />
          )}
        </Column>
        <Column className="content"></Column>
      </Grid>
    </Theme>
  );
};

export default Login;
