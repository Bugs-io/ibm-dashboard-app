import { useState } from "react";
import { LoginStep1, LoginStep2, LandingLayout } from "@/components";
import Head from "next/head";

const Login = () => {
  const [loginStep, setLoginStep] = useState(1);
  const swtichLoginStep = (step: number) => {
    setLoginStep(step);
  };

  const handleLogin = () => {
    console.log("TODO: Log In");
  };

  return (
    <>
    <Head>
      <title>IBM Strategic Dashboard</title>
    </Head>
      <LandingLayout>
        {loginStep === 1 ? (
          <LoginStep1 switchLoginStep={swtichLoginStep} />
        ) : (
          <LoginStep2
            handleClick={handleLogin}
            swtichLoginStep={swtichLoginStep}
          ></LoginStep2>
        )}
      </LandingLayout>
    </>
  );
};

export default Login;
