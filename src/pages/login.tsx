import { useState } from "react";
import { LoginStep1, LoginStep2, LandingLayout } from "@/components";
import Head from "next/head";

import { UserData, FormErrors } from "@/utils/SignUpValidations/types";

import useClient from "@/hooks/useClient";
import { AxiosError } from "axios";
import { LoadingStatus } from "@/utils/inlineLoadingStatus";
import { serverErrorMessages } from "@/utils/serverErrorMessages";

function Login() {
  const client = useClient();

  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("inactive");

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
      setLoadingStatus("active");
      const res = await client.login(loginData.email, loginData.password);
      setLoadingStatus("inactive");
    } catch (error) {
      setLoadingStatus("inactive");
      if (error instanceof AxiosError) {
        const errorCode = error.response?.data.error_code;

        errorMsg =
          serverErrorMessages.login[errorCode] || serverErrorMessages.default;
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

                Object.keys(newFormErrors).forEach(key => {
                  newFormErrors[key] = "";
                });
              });
            }}
            inputError={formErrors.password}
            handleChange={handleChange}
            loginData={loginData}
            loadingStatus={loadingStatus}
          />
        )}
      </LandingLayout>
    </>
  );
}

export default Login;
