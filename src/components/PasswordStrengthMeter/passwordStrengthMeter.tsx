import { CloseOutline, CheckmarkOutline } from "@carbon/icons-react";

import styles from "./styles.module.scss";

interface Props {
  requirements: {
    hasMinLength: boolean;
    hasLetters: boolean;
    hasNumbers: boolean;
  };
}

const CloseOutlineColored = () => <CloseOutline color="red" />

const CheckmarkOutlineColored = () => <CheckmarkOutline color="green" />

const PasswordStrengthMeter = ({ requirements }: Props) => (
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
  )

export default PasswordStrengthMeter;
