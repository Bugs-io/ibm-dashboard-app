import { Modal } from "carbon-components-react";
import { useRouter } from "next/router";

interface Props {
  isActive: boolean;
}

const SignUpModal = ({ isActive }: Props) => {
  const router = useRouter();
  return (
    <Modal
      open={isActive}
      modalHeading="Account created."
      primaryButtonText="Log In"
      preventCloseOnClickOutside
      onRequestClose={() => router.push("/login")}
      onRequestSubmit={(e) => {
        e.preventDefault();
        router.push("/login");
      }}
      shouldSubmitOnEnter
      size="xs"
    />
  );
}

export default SignUpModal;
