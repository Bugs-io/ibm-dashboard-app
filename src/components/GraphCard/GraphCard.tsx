import { Button } from "carbon-components-react";
import { MachineLearningModel } from "@carbon/icons-react";
import styles from "./styles.module.scss";

interface Props {
  id: string;
  title: string;
  isInteractive: boolean;
  hasAI?: boolean;
  hasAILabel?: string;
  children?: React.ReactNode;
}

const GraphCard = ({
  id,
  title,
  isInteractive,
  hasAI,
  hasAILabel = "Powered by AI",
  children,
}: Props) => (
  <div
    className={styles.card}
    key={id}
    data-id={id}
    style={{ cursor: isInteractive ? "grab" : "" }}
  >
    <div className={styles.title}>
      <h2>{title}</h2>
      {hasAI && (
        <div className={styles.star}>
          <Button
            hasIconOnly
            renderIcon={() => <MachineLearningModel />}
            iconDescription={hasAILabel}
            kind="ghost"
            size="sm"
          />
        </div>
      )}
    </div>
    <div className={styles.graphContainer}>{children}</div>
  </div>
);

export default GraphCard;
