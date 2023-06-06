import { useState, useEffect } from "react";
import { PieChart } from "@carbon/charts-react";
import useClient from "@/hooks/useClient";
import { ChartTabularData, PieChartOptions } from "@carbon/charts/interfaces";
import GraphCard from "@/components/GraphCard";
import { ChartProps } from "@/utils/chartOptions";

const graphOptions: PieChartOptions = {
  resizable: true,
  legend: {
    // @ts-expect-error
    alignment: "center",
  },
  pie: {
    // @ts-expect-error
    alignment: "center",
  },
  height: "400px",
  // @ts-expect-error
  theme: "g90",
  data: {
    loading: true,
  },
};

interface MatchedCertificationsResponse {
  total_certifications_analysed: number;
  number_of_matched_certifications: number;
  number_of_unmatched_certifications: number;
}

const parseMatchedCertification = (
  response: MatchedCertificationsResponse
): ChartTabularData => [
  {
    group: "IBM's certifications",
    value: response.total_certifications_analysed,
  },
  {
    group: "Certifications that matched on famous plattforms",
    value: response.number_of_matched_certifications,
  },
];

const MatchedCertifications = ({ id, isInteractive }: ChartProps) => {
  const client = useClient();
  const [data, setData] = useState<any>([]);
  const [graphLoadingTitle, setGraphLoadingTitle] = useState<string>(
    "Consulting third paty sources. . ."
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [options, setOptions] = useState<PieChartOptions>(graphOptions);

  const getMatchedCertifications = async () => {
    try {
      const res = await client.getMatchedCertifications();
      setData(parseMatchedCertification(res));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setGraphLoadingTitle("");
    }
  };

  useEffect(() => {
    getMatchedCertifications();
  }, []);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      data: {
        loading: isLoading,
      },
      title: graphLoadingTitle,
    }));
  }, [isLoading]);

  return (
    <GraphCard
      id={id}
      title="Matched certifications with the industry"
      isInteractive={isInteractive}
    >
      <PieChart data={data} options={options} />
    </GraphCard>
  );
};

export default MatchedCertifications;
