import { useEffect, useState } from "react";
import { LoginStep1, LoginStep2, LandingLayout } from "@/components";
import { validateEmail } from "@/utils/SignUpValidations";
import Head from "next/head";

import { UserData, FormErrors } from "@/utils/SignUpValidations/types";

const Login = () => {
  const [loginStep, setLoginStep] = useState(1);

  const [loginData, setLoginData] = useState<UserData>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const handleClickStep1 = () => {
    if (!loginData.email) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        email: "E-mail is required",
      }));
      return;
    }

    setLoginStep(2);
  };

  const handleStepBack = () => {
    setLoginStep(1);
    setLoginData(prevLoginData);
  };

  const handleChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (loginData.email !== "") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        email: "",
      }));
    }
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [field]: value,
    }));
  };

  const handleLogin = () => {
    console.log("TODO: POST Log In");
  };

  return (
    <>
      <Head>
        <title>IBM Strategic Dashboard</title>
      </Head>
      <LandingLayout>
        {loginStep === 1 ? (
          <LoginStep1
            handleChange={handleChange}
            handleClick={handleClickStep1}
            inputError={formErrors.email}
            loginData={loginData}
          />
        ) : (
          <LoginStep2
            handleClick={handleLogin}
            switchLoginStep={() => setLoginStep(1)}
            handleChange={handleChange}
            loginData={loginData}
          />
        )}
      </LandingLayout>
    </>
  );
};

export default Login;
