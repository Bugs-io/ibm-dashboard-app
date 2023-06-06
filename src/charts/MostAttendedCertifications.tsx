import { useEffect, useMemo, useState } from "react";
import GraphCard from "@/components/GraphCard";
import useClient from "@/hooks/useClient";
import { SimpleBarChart } from "@carbon/charts-react";
import { BarChartOptions } from "@carbon/charts/interfaces";
import { ChartProps } from "@/utils/chartOptions";

type Certification = {
  name: string;
  total_attendees: number;
};

const graphOptions: BarChartOptions = {
  axes: {
    left: {
      mapsTo: "group",
      // @ts-expect-error
      scaleType: "labels",
    },
    bottom: {
      mapsTo: "total_attendees",
    },
  },
  height: "400px",
  // @ts-expect-error
  theme: "g90",
  data: {
    loading: true,
  },
};

const parseCertifications = (certifications: Certification[]) =>
  certifications.map(({ name, total_attendees }) => ({
    group: name,
    total_attendees,
  }));

const MostAttendedCertifications = ({ id, isInteractive }: ChartProps) => {
  const client = useClient();

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [options, setOptions] = useState<BarChartOptions>(graphOptions);

  const getMostAttendedCertifications = async () => {
    try {
      setIsLoading(true);
      const response = await client.getMostAttendedCertifications(
        5,
        "last_year"
      );
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const certifications = useMemo(() => {
    if (!data.certifications) {
      return [];
    }
    return parseCertifications(data.certifications);
  }, [data]);

  useEffect(() => {
    getMostAttendedCertifications();
  }, []);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      data: { loading: isLoading },
    }));
  }, [isLoading]);

  return (
    <GraphCard
      id={id}
      title="Most Attended Certifications"
      isInteractive={isInteractive}
    >
      <SimpleBarChart data={certifications} options={options} />
    </GraphCard>
  );
};

export default MostAttendedCertifications;
