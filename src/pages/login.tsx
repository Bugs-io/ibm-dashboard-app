import { Theme, Grid, Column } from "carbon-components-react";

import { LoginStep1, LoginStep2 } from "@/components";

import { useState } from "react";

const Login = () => {
  const [loginStep, setLoginStep] = useState(1);
  const swtichLoginStep = (step: number) => {
    setLoginStep(step);
  };

  const handleLogin = () => {
    console.log("TODO: Log In");
  };

  return (
    <Theme theme="g100" className="login-page">
      <Grid fullWidth style={{ margin: 0, padding: 0 }}>
        <Column className="sidebar" sm={4} md={3} lg={6} style={{ margin: 0 }}>
          {loginStep === 1 ? (
            <LoginStep1 switchLoginStep={swtichLoginStep} />
          ) : (
            <LoginStep2
              handleClick={handleLogin}
              swtichLoginStep={swtichLoginStep}
            ></LoginStep2>
          )}
        </Column>
        <Column className="content"></Column>
      </Grid>
    </Theme>
  );
};

export default Login;
