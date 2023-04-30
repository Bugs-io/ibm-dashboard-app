import { CloseOutline, CheckmarkOutline } from "@carbon/icons-react";

import styles from "./styles.module.scss";

interface Props {
  requirements: {
    hasMinLength: boolean;
    hasLetters: boolean;
    hasNumbers: boolean;
  };
}

function CloseOutlineColored() {
  return <CloseOutline color="red" />;
}

function CheckmarkOutlineColored() {
  return <CheckmarkOutline color="green" />;
}

function PasswordStrengthMeter({ requirements }: Props) {
  return (
    <div className={styles.container}>
        <div className={styles.check}>
          {requirements.hasMinLength ? (
            <CheckmarkOutlineColored />
          ) : (
            <CloseOutlineColored />
          )}{" "}
          <p>At least 6 characters</p>
        </div>

        <div className={styles.check}>
          {requirements.hasLetters ? (
            <CheckmarkOutlineColored />
          ) : (
            <CloseOutlineColored />
          )}{" "}
          <p>A letter</p>
        </div>

        <div className={styles.check}>
          {requirements.hasNumbers ? (
            <CheckmarkOutlineColored />
          ) : (
            <CloseOutlineColored />
          )}
          <p>A number</p>
        </div>
      </div>
  );
}

export default PasswordStrengthMeter;
