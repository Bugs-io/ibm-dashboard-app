import { useState, useEffect } from "react";
import { SimpleBarChart } from "@carbon/charts-react";
import { BarChartOptions, ChartTabularData } from "@carbon/charts/interfaces";
import GraphCard from "@/components/GraphCard";
import { ChartProps } from "@/utils/chartOptions";
import useClient from "@/hooks/useClient";

const graphOptions: BarChartOptions = {
  axes: {
    left: {
      mapsTo: "group",
      // @ts-expect-error
      scaleType: "labels",
    },
    bottom: {
      mapsTo: "value",
    },
  },
  height: "400px",
  // @ts-expect-error
  theme: "g90",
  data: {
    loading: true,
  },
};

const TopIndustryCourses = ({ id, isInteractive }: ChartProps) => {
  const client = useClient();
  const [data, setData] = useState<ChartTabularData>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [graphLoadingTitle, setGraphLoadingTitle] = useState<string>(
    "Consulting third party sources. . ."
  );
  const [options, setOptions] = useState<BarChartOptions>(graphOptions);

  const getTopIndustryCourses = async () => {
    try {
      setIsLoading(true);
      const response = await client.getTopIndustryCourses();
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setGraphLoadingTitle("");
    }
  };

  useEffect(() => {
    getTopIndustryCourses();
  }, []);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      data: { loading: isLoading },
      title: graphLoadingTitle,
    }));
  }, [isLoading]);

  return (
    <GraphCard
      title="Top courses from the industry"
      id={id}
      isInteractive={isInteractive}
    >
      <SimpleBarChart data={data} options={options} />
    </GraphCard>
  );
};

export default TopIndustryCourses;
