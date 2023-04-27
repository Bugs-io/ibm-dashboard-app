import { useState } from "react";
import { LoginStep1, LoginStep2, LandingLayout } from "@/components";
import Head from "next/head";

import { UserData, FormErrors } from "@/utils/SignUpValidations/types";

import useClient from "@/hooks/useClient";
import axios from "axios";

const Login = () => {
  const client = useClient();

  const [loginStep, setLoginStep] = useState(1);

  const [loginData, setLoginData] = useState<UserData>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const handleSubmitStep1 = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      password: "",
    }));

    if (!loginData.email) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        email: "E-mail is required",
      }));
      return;
    }

    setLoginStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (loginData.email !== "") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        email: "",
      }));
    }
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    console.log(loginData);
    console.log("TODO: POST Log In");
    const res = await client.login(loginData.email, loginData.password);
    await console.log(res);
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
            handleSubmit={handleSubmitStep1}
            inputError={formErrors.email}
            loginData={loginData}
          />
        ) : (
          <LoginStep2
            handleSubmit={handleLogin}
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
