import { useState } from "react";
import { LoginStep1, LoginStep2, LandingLayout } from "@/components";
import Head from "next/head";

import { UserData, FormErrors } from "@/utils/SignUpValidations/types";

import useClient from "@/hooks/useClient";
import { AxiosError } from "axios";
import { LoadingStatus } from "@/utils/inlineLoadingStatus";
import { serverErrorMessages } from "@/utils/serverErrorMessages";
import { useAuthContext } from "@/contexts/AuthContext";
import withAuth from "@/components/withAuth";
import { useRouter } from "next/router";

const Login = () => {
  const client = useClient();
  const router = useRouter();
  const { saveAuthToken } = useAuthContext();

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

  const handleBackToStep1 = () => {
    setLoginStep(1);
    setFormErrors((prevFormErrors) => {
      const cleanedFormErrors = prevFormErrors;

      Object.keys(prevFormErrors).forEach((key) => {
        cleanedFormErrors[key] = "";
      });

      return cleanedFormErrors;
    });
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let errorMsg = "";

    try {
      setLoadingStatus("active");
      const res = await client.login(loginData.email, loginData.password);
      saveAuthToken!(res.id_token);
      setLoadingStatus("inactive");
      router.push("/");
    } catch (error) {
      setLoadingStatus("inactive");
      if (error instanceof AxiosError) {
        const errorCode = error.response?.data.error_code;
        errorMsg =
          // @ts-expect-error
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
            switchLoginStep={handleBackToStep1}
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

export default withAuth(Login, { isPrivate: false });
