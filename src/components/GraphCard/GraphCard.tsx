import styles from "./styles.module.scss";

interface Props {
  id: string;
  title: string;
  isInteractive: boolean;
}

const GraphCard = ({ id, title, isInteractive }: Props) => (
  <div className={styles.card} key={id} data-id={id} style={{cursor: isInteractive ? "grab" : ""}}>
    <h2>{title}</h2>
  </div>
);

export default GraphCard;
