import { useState, useEffect, useMemo } from "react";
import GraphCard from "@/components/GraphCard";
import useClient from "@/hooks/useClient";
import { AreaChart } from "@carbon/charts-react";

type Props = {
  id: string;
  isInteractive: boolean;
}

type YearRecord = {
  year: number;
  taken_certifications: number;
}

const graphOptions = {
  axes: {
    bottom: {
      title: "Year",
      mapsTo: "date",
      scaleType: "time",
    },
    left: {
      title: "Taken certifications",
      mapsTo: "taken_certifications",
      scaleType: "log",
      includeZero: false
    },
  },
  legend: {
    enabled: false,
  },
  color: {
      gradient: {
        enabled: false,
      }
  },
  timeScale: {
    addSpaceOnEdges: 0,
  },
  height: "400px",
  theme: "g90",
}

const parseYearRecords = (yearRecords: YearRecord[]) => yearRecords.map(({ year, taken_certifications }) => ({
    group: "",
    date: new Date(year, 0),
    taken_certifications,
}));

const CertificationsTakenOverTime = ({ id, isInteractive }: Props) => {
  const client = useClient();

  const [data, setData] = useState<any>([]);
  const [_, setIsLoading] = useState<boolean>(true);

  const getCertificationsTakenOverTheYears = async () => {
    try {
      setIsLoading(true);
      const response = await client.getCertificationsTakenOverTheYears();
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const yearRecords = useMemo(() => {
    if (!data.length) {
      return [];
    }

    return parseYearRecords(data);
  }, [data]);

  useEffect(() => {
    getCertificationsTakenOverTheYears();
  }, []);

  return (
    <GraphCard
      id={id}
      title="Certifications taken over time"
      isInteractive={isInteractive}
    >
      <AreaChart
        data={yearRecords}
        options={graphOptions}
      />
    </GraphCard>
  )
}

export default CertificationsTakenOverTime;
