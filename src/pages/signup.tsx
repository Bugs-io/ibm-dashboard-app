import { useEffect, useState } from "react";
import { LandingLayout } from "@/components";

import { Button, Form, TextInput } from "carbon-components-react";
import styles from "../components/LoginSteps/logingSteps.module.scss";
import { ArrowRight } from "@carbon/icons-react";
import CarbonLink from "@/components/CarbonLink";
import Head from "next/head";

interface formErrors {
  [key: string]: string;
}

interface userData {
  [key: string]: string;
}

const signup = () => {
  const [userData, setUserData] = useState<userData>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<formErrors>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {};

  const validateEmail = () => {
    let errorMessage = "";

    if (!userData.email) {
      errorMessage = "E-mail is required";
    } else if (
      !/^\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\s*$/.test(
        userData.email
      )
    ) {
      errorMessage = "Invalid format (suggested: name@company.com)";
    } else {
      errorMessage = "";
    }

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      email: errorMessage,
    }));
  };

  const validateFirstName = () => {
    let errorMessage = "";
    if (!userData.firstName) {
      errorMessage = "First name is required";
    }
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      firstName: errorMessage,
    }));
  };

  const validateLastName = () => {
    let errorMessage = "";
    if (!userData.lastName) {
      errorMessage = "Last name is required";
    }
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      lastName: errorMessage,
    }));
  };

  const validatePassword = () => {
    let errorMessage = "";
    if (!userData.password) {
      errorMessage = "Password is required";
    }
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      password: errorMessage,
    }));
  };

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
      validateEmail();
      validateFirstName();
      validateLastName();
      validatePassword();
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
              marginBottom: 40,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <h2>Sign Up</h2>
            <h4 style={{ marginBottom: 16 }}>
              Please fill the following fields
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
                onBlur={validateEmail}
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
                  onBlur={validateFirstName}
                  invalid={formErrors.firstName !== ""}
                  invalidText={formErrors.firstName}
                />

                <TextInput
                  id="signup-lastName"
                  name="lastName"
                  labelText="Last name"
                  value={userData.lastName}
                  onChange={(val) => handleChange("lastName", val)}
                  onBlur={validateLastName}
                  invalid={formErrors.lastName !== ""}
                  invalidText={formErrors.lastName}
                />
              </div>

              <TextInput.PasswordInput
                id="signup-passowrd"
                name="password"
                labelText="Password"
                onBlur={validatePassword}
                onChange={(e) => handleChange("password", e)}
                invalid={formErrors.password !== ""}
                invalidText={formErrors.password}
              />
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
            <p style={{ textAlign: "end" }}>
              Have an account? <CarbonLink href="/login">Log in</CarbonLink>
            </p>
          </Form>
        </div>
      </LandingLayout>
    </>
  );
};

export default signup;
