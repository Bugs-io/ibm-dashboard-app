import { useEffect, useMemo, useState } from "react";
import GraphCard from "@/components/GraphCard";
import useClient from "@/hooks/useClient";
import { SimpleBarChart } from "@carbon/charts-react";
import { BarChartOptions } from "@carbon/charts/interfaces";
import { ChartProps } from "@/utils/chartOptions";
import { Dropdown } from "carbon-components-react";

type Certification = {
  name: string;
  total_attendees: number;
};

const timePeriods = [
  { id: "last_year", label: "Last Year" },
  { id: "last_5_years", label: "Last 5 years" },
  { id: "last_10_years", label: "Last 10 years" },
  { id: "all_time", label: "All time" },
]

const graphOptions: BarChartOptions = {
  axes: {
    left: {
      title: "Certification",
      mapsTo: "group",
      // @ts-expect-error
      scaleType: "labels",
    },
    bottom: {
      title: "Total Attendees",
      mapsTo: "total_attendees",
    },
  },
  height: "400px",
  // @ts-expect-error
  theme: "g90",
  data: {
    loading: true,
  },
  legend: {
    enabled: false,
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
  const [targetPeriod, setTargetPeriod] = useState<string>("last_year");

  const getMostAttendedCertifications = async (period: string) => {
    try {
      setIsLoading(true);
      const response = await client.getMostAttendedCertifications(
        5,
        period
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

    const parsedCertifications =  parseCertifications(data.certifications);
    const sortedCertifications = parsedCertifications.sort((a, b) => a.total_attendees - b.total_attendees);

    return sortedCertifications;
  }, [data]);

  useEffect(() => {
    getMostAttendedCertifications(targetPeriod);
  }, [targetPeriod]);

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
      <Dropdown
        id="time-period-dropdown"
        style={{ marginBottom: 0, marginTop: 16, width: 200 }}
        label="Time period"
        items={timePeriods}
        selectedItem={timePeriods.find(period => period.id === targetPeriod)}
        onChange={({ selectedItem }) => selectedItem && setTargetPeriod(selectedItem.id)}
      />
      <SimpleBarChart data={certifications} options={options} />
    </GraphCard>
  );
};

export default MostAttendedCertifications;
