import { useState } from "react";
import { LoginStep1, LoginStep2, LandingLayout } from "@/components";
import Head from "next/head";

import {
  UserData,
  FormErrors,
  ServerErrorMessages,
} from "@/utils/SignUpValidations/types";

import useClient from "@/hooks/useClient";
import { AxiosError } from "axios";

const serverErrorMessages: ServerErrorMessages = {
  INVALID_PASSWORD: "Invalid IBMid or password. Please try again.",
  USER_DOES_NOT_EXIST: "User not found.",
  default: "Something went wrong",
};

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

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let errorMsg = "";

    try {
      const res = await client.login(loginData.email, loginData.password);
      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorCode = error.response?.data.error_code;
        errorMsg =
          serverErrorMessages[errorCode] || serverErrorMessages.default;
      }
    }

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      password: errorMsg,
    }));
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
            switchLoginStep={() => {
              setLoginStep(1);
              setFormErrors((prevFormErrors) => {
                const newFormErrors = { ...prevFormErrors };
                for (const key in newFormErrors) {
                  newFormErrors[key] = "";
                }
                return newFormErrors;
              });
            }}
            inputError={formErrors.password}
            handleChange={handleChange}
            loginData={loginData}
          />
        )}
      </LandingLayout>
    </>
  );
};

export default Login;
