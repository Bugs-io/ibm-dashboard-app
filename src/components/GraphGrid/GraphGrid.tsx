import { useState, useEffect, useRef } from "react";
import Sortable from "sortablejs";
import { Toggle } from "carbon-components-react";
import { Sample } from "@/charts";
import { BarChartOptions, ChartTabularData } from "@carbon/charts/interfaces";
import GraphCard from "../GraphCard";
import styles from "./styles.module.scss";

const sampleData: ChartTabularData = [
  {
    group: "Qty",
    value: 65000,
  },
  {
    group: "More",
    value: 29123,
  },
  {
    group: "Sold",
    value: 35213,
  },
  {
    group: "Restocking",
    value: 51213,
  },
  {
    group: "Misc",
    value: 16932,
  },
];

const sampleOptions: BarChartOptions = {
  title: "",
  axes: {
    left: {
      mapsTo: "value",
    },
    bottom: {
      mapsTo: "group",
      scaleType: "labels",
    },
  },
  height: "400px",
  width: "100%",
  theme: "g90",
};

const GraphGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const sortableJsRef = useRef<Sortable | null>(null);
  const [isGridInteractive, setIsGridInteractive] = useState<boolean>(false);

  const onListChange = () => {
    /* Use the following when saving to localStorage
    const newData = [...gridRef.current.children]
      .map((i) => i.dataset.id)
      .map((id) => data.find((item) => item.id === id));
    */
    setData(data);
  };

  useEffect(() => {
    if (isGridInteractive) {
      sortableJsRef.current = new Sortable(gridRef.current!, {
        animation: 150,
        swap: true,
        swapThreshold: 0.65,
        ghostClass: styles.grabbing,
        onEnd: onListChange,
      });
    } else {
      sortableJsRef.current?.destroy();
    }
  }, [isGridInteractive]);

  return (
    <div className={styles.container}>
      <h1 style={{ marginBottom: 32 }}>Dashboard</h1>
      <div style={{ marginBottom: 32 }}>
        <Toggle
          id="toggle"
          labelText="Move grid"
          size="sm"
          onToggle={(status) => setIsGridInteractive(status)}
        />
      </div>

      <div className={styles.graphsContainer} ref={gridRef}>
        <GraphCard
          id="1"
          isInteractive={isGridInteractive}
          title="My First Graph"
        >
          <div>A</div>
        </GraphCard>
        <GraphCard
          id="2"
          isInteractive={isGridInteractive}
          title="My Second Graph"
        >
          <div>A</div>
        </GraphCard>
        <GraphCard
          id="3"
          isInteractive={isGridInteractive}
          title="My Third Graph"
        >
          <div>A</div>
        </GraphCard>
        <GraphCard
          id="3"
          isInteractive={isGridInteractive}
          title="Sample Graph"
        >
          <Sample data={sampleData} options={sampleOptions} />
        </GraphCard>
      </div>
    </div>
  );
};

export default GraphGrid;
