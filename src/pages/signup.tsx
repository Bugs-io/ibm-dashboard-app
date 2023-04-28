import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Button,
  Form,
  InlineLoading,
  TextInput,
  Tooltip,
} from "carbon-components-react";
import { ArrowRight } from "@carbon/icons-react";
import { LandingLayout } from "@/components";
import CarbonLink from "@/components/CarbonLink";
import styles from "@/styles/LandingForm.module.scss";

import {
  isEmailValid,
  isFirstNameValid,
  isLastNameValid,
  isPasswordStrong,
  isPasswordValid,
} from "../utils/SignUpValidations";

import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";

import {
  UserData,
  FormErrors,
  PasswordRequirements,
} from "@/utils/SignUpValidations/types";
import useClient from "@/hooks/useClient";
import { AxiosError } from "axios";
import { LoadingStatus } from "@/utils/inlineLoadingStatus";
import { serverErrorMessages } from "@/utils/serverErrorMessages";

const Signup = () => {
  const client = useClient();

  const [userData, setUserData] = useState<UserData>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [passwordRequirements, setPasswordRequirements] =
    useState<PasswordRequirements>({
      hasMinLength: false,
      hasLetters: false,
      hasNumbers: false,
    });

  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("inactive");

  useEffect(() => {
    isPasswordStrong(userData.password, setPasswordRequirements);
  }, [userData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      !isEmailValid(userData.email, setFormErrors) ||
      !isFirstNameValid(userData.firstName!, setFormErrors) ||
      !isLastNameValid(userData.lastName!, setFormErrors) ||
      !isPasswordValid(
        userData.password,
        setFormErrors,
        setPasswordRequirements
      )
    ) {
      return;
    }

    try {
      setLoadingStatus("active");
      const res = await client.signup(
        userData.email,
        userData.firstName!,
        userData.lastName!,
        userData.password
      );
      setLoadingStatus("inactive");
    } catch (error) {
      let errorMsg = "";
      if (error instanceof AxiosError) {
        const errorCode = error.response?.data.error_code;
        console.log("signup", errorCode);
        errorMsg =
          serverErrorMessages.signup[errorCode] || serverErrorMessages.default;
      }

      setLoadingStatus("inactive");

      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        password: errorMsg,
      }));
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | IBM Strategic Dashboard</title>
      </Head>
      <LandingLayout>
        <div className={styles.loginForm}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <h2>Create an account</h2>
            <h4 style={{ marginBottom: 40 }}>
              Already have one?{" "}
              <CarbonLink href="/login" className={styles.linkButton}>
                Log in
              </CarbonLink>
            </h4>
          </div>
          <div className={styles.divider} />

          <Form>
            <div className={styles.form}>
              <TextInput
                id="signup-email"
                labelText="E-mail"
                name="email"
                onBlur={() => isEmailValid(userData.email, setFormErrors)}
                value={userData.email}
                onChange={(e) => handleChange(e)}
                invalid={formErrors.email !== ""}
                invalidText={formErrors.email}
              />

              <div style={{ display: "flex", gap: 24 }}>
                <TextInput
                  id="signup-firstName"
                  name="firstName"
                  labelText="First name"
                  value={userData.firstName}
                  onChange={(e) => handleChange(e)}
                  onBlur={() =>
                    isFirstNameValid(userData.firstName!, setFormErrors)
                  }
                  invalid={formErrors.firstName !== ""}
                  invalidText={formErrors.firstName}
                />

                <TextInput
                  id="signup-lastName"
                  name="lastName"
                  labelText="Last name"
                  value={userData.lastName}
                  onChange={(e) => handleChange(e)}
                  onBlur={() =>
                    isFirstNameValid(userData.lastName!, setFormErrors)
                  }
                  invalid={formErrors.lastName !== ""}
                  invalidText={formErrors.lastName}
                />
              </div>

              <Tooltip
                label={
                  <PasswordStrengthMeter requirements={passwordRequirements} />
                }
              >
                <TextInput.PasswordInput
                  id="signup-passowrd"
                  name="password"
                  labelText="Password"
                  onBlur={() =>
                    isPasswordValid(
                      userData.password,
                      setFormErrors,
                      setPasswordRequirements
                    )
                  }
                  onChange={(e) => handleChange(e)}
                  invalid={formErrors.password !== ""}
                  invalidText={formErrors.password}
                  value={userData.password}
                />
              </Tooltip>
            </div>

            <Button
              type="submit"
              kind="primary"
              renderIcon={ArrowRight}
              onClick={(e) => handleSubmit(e)}
              className={styles.buttonContainer}
            >
              <div className={styles.buttonContent}
              >
                <p>Create account</p>
                <InlineLoading
                  style={{ width: "auto" }}
                  status={loadingStatus}
                />
              </div>
            </Button>
          </Form>
        </div>
      </LandingLayout>
    </>
  );
};

export default Signup;
