import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Form, TextInput, Tooltip } from "carbon-components-react";
import { ArrowRight } from "@carbon/icons-react";
import { LandingLayout } from "@/components";
import CarbonLink from "@/components/CarbonLink";
import styles from "../components/LoginSteps/logingSteps.module.scss";

import {
  passwordStrengthMeter,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
} from "@/utils/signUpValidations";

import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface FormErrors {
  [key: string]: string;
}

interface PasswordRequirements {
  hasMinLength: boolean;
  hasLetters: boolean;
  hasNumbers: boolean;
}

const signup = () => {
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

  useEffect(() => {
    passwordStrengthMeter(userData.password, setPasswordRequirements);
  }, [userData.password]);

  const handleChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (Object.keys(formErrors).every((key) => formErrors[key] === "")) {
      validateEmail(userData.email, setFormErrors);
      validateFirstName(userData.firstName, setFormErrors);
      validateLastName(userData.lastName, setFormErrors);
      validatePassword(userData.password, setFormErrors);
      return;
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <TextInput
                id="signup-email"
                labelText="E-mail"
                name="email"
                onBlur={() => validateEmail(userData.email, setFormErrors)}
                value={userData.email}
                onChange={(val) => handleChange("email", val)}
                invalid={formErrors.email !== ""}
                invalidText={formErrors.email}
              />

              <div style={{ display: "flex", gap: 24 }}>
                <TextInput
                  id="signup-firstName"
                  name="firstName"
                  labelText="First name"
                  value={userData.firstName}
                  onChange={(val) => handleChange("firstName", val)}
                  onBlur={() =>
                    validateFirstName(userData.firstName, setFormErrors)
                  }
                  invalid={formErrors.firstName !== ""}
                  invalidText={formErrors.firstName}
                />

                <TextInput
                  id="signup-lastName"
                  name="lastName"
                  labelText="Last name"
                  value={userData.lastName}
                  onChange={(val) => handleChange("lastName", val)}
                  onBlur={() =>
                    validateLastName(userData.lastName, setFormErrors)
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
                    validatePassword(userData.password, setFormErrors)
                  }
                  onChange={(e) => handleChange("password", e)}
                  invalid={formErrors.password !== ""}
                  invalidText={formErrors.password}
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
              Create account
            </Button>
          </Form>
        </div>
      </LandingLayout>
    </>
  );
};

export default signup;
