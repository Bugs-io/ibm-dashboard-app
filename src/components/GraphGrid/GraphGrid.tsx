import { useState, useEffect, useRef } from "react";
import Sortable from "sortablejs";
import { Toggle } from "carbon-components-react";
import {
  MatchedCertifications,
  MostAttendedCertifications,
  SearchRadar,
  TopIndustryCourses,
} from "@/charts";
import "@carbon/charts/styles.css";
import styles from "./styles.module.scss";

interface GraphData {
  id: string;
  content: string;
}

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
        <SearchRadar id="1" isInteractive={isGridInteractive} />
        <MostAttendedCertifications id="2" isInteractive={isGridInteractive} />
        <TopIndustryCourses id="4" isInteractive={isGridInteractive} />
        <MatchedCertifications id="3" isInteractive={isGridInteractive} />
      </div>
    </div>
  );
};

export default GraphGrid;
