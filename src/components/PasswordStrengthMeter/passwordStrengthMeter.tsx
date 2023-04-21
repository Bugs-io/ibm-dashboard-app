import { CloseOutline, CheckmarkOutline } from "@carbon/icons-react";

interface props {
  requirements: {
    hasMinLength: boolean;
    hasLetters: boolean;
    hasNumbers: boolean;
  };
}

const CloseOutlineColored = () => {
  return <CloseOutline color="red" />;
};

const CheckmarkOutlineColored = () => {
  return <CheckmarkOutline color="green" />;
};

const PasswordStrengthMeter = ({ requirements }: props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          color: "#000",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {requirements.hasMinLength ? (
            <CheckmarkOutlineColored />
          ) : (
            <CloseOutlineColored />
          )}{" "}
          <p>At least 6 characters</p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {requirements.hasLetters ? (
            <CheckmarkOutlineColored />
          ) : (
            <CloseOutlineColored />
          )}{" "}
          <p>A letter</p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {requirements.hasNumbers ? (
            <CheckmarkOutlineColored />
          ) : (
            <CloseOutlineColored />
          )}
          <p>A number</p>
        </div>
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
