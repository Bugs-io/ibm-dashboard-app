import { useState } from "react";
import { LoginStep1, LoginStep2 } from "@/components";

import LandigLayout from "@/components/LandingLayout";

const Login = () => {
  const [loginStep, setLoginStep] = useState(1);
  const swtichLoginStep = (step: number) => {
    setLoginStep(step);
  };

  const handleLogin = () => {
    console.log("TODO: Log In");
  };

  return (
    <LandigLayout>
      {loginStep === 1 ? (
        <LoginStep1 switchLoginStep={swtichLoginStep} />
      ) : (
        <LoginStep2
          handleClick={handleLogin}
          swtichLoginStep={swtichLoginStep}
        ></LoginStep2>
      )}
    </LandigLayout>
  );
};

export default Login;
