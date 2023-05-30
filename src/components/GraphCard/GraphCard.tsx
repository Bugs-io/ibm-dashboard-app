import styles from "./styles.module.scss";

interface Props {
  id: string;
  title: string;
  isInteractive: boolean;
  children?: React.ReactNode;
}

const GraphCard = ({ id, title, isInteractive, children }: Props) => (
  <div
    className={styles.card}
    key={id}
    data-id={id}
    style={{ cursor: isInteractive ? "grab" : "" }}
  >
    <h2>{title}</h2>
    {children}
  </div>
);

export default GraphCard;
