import { useState, useEffect, useRef } from "react";
import Sortable from "sortablejs";
import { Toggle } from "carbon-components-react";
import { Sample, SearchRadar } from "@/charts";
import { BarChartOptions, ChartTabularData } from "@carbon/charts/interfaces";
import GraphCard from "../GraphCard";
import styles from "./styles.module.scss";

interface GraphData {
  id: string;
  content: string;
}

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

const dummyData: GraphData[] = Array.from({ length: 8 }, (_, i) => ({
  id: (i + 1).toString(),
  content: (i + 1).toString(),
}));

const GraphGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const sortableJsRef = useRef<Sortable | null>(null);
  const [isGridInteractive, setIsGridInteractive] = useState<boolean>(false);
  const [data, setData] = useState<GraphData[]>(dummyData);

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
          id="3"
          isInteractive={isGridInteractive}
          title="Sample Graph"
        >
          <Sample data={sampleData} options={sampleOptions} />
        </GraphCard>
        <GraphCard
          id="1"
          isInteractive={isGridInteractive}
          title="Search User Strength"
        >
          <SearchRadar />
        </GraphCard>
        <GraphCard
          id="2"
          isInteractive={isGridInteractive}
          title="Placeholder Graph"
        />
      </div>
    </div>
  );
};

export default GraphGrid;
