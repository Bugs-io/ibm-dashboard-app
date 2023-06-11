// @ts-expect-error
import { Theme, ToastNotification } from "carbon-components-react";
import styles from "./styles.module.scss";

interface Props {
  handleNotification: (success: boolean) => void;
}

const Notification = ({ handleNotification }: Props) => (
  <div className={styles.notification}>
    <Theme theme="g90">
      <ToastNotification
        title="File uploaded!"
        kind="success"
        lowContrast
        onCloseButtonClick={() => handleNotification(false)}
        // @ts-ignore
        onClose={() => handleNotification(false)}
      />
    </Theme>
  </div>
);

export default Notification;
