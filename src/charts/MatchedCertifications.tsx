import { useState, useEffect } from "react";
import { GaugeChart } from "@carbon/charts-react";
import useClient from "@/hooks/useClient";
import { ChartTabularData, GaugeChartOptions } from "@carbon/charts/interfaces";
import GraphCard from "@/components/GraphCard";
import { ChartProps } from "@/utils/chartOptions";
import utilsStyles from "../styles/utils.module.scss";

const graphOptions: GaugeChartOptions = {
  resizable: true,
  gauge: {
    // @ts-expect-error
    type: "semi",
  },
  height: "250px",
  color: {
    scale: {
      value: "#4589FF",
    },
  },
  // @ts-expect-error
  theme: "g90",
};

interface MatchedCertificationsResponse {
  total_certifications_analysed: number;
  number_of_matched_certifications: number;
  number_of_unmatched_certifications: number;
}

const parseMatchedCertification = (
  response: MatchedCertificationsResponse
): ChartTabularData => {
  const percentage = Math.round(
    (response.number_of_matched_certifications /
      response.total_certifications_analysed) *
      100
  );
  return [
    {
      group: "value",
      value: percentage,
    },
  ];
};

const MatchedCertifications = ({ id, isInteractive }: ChartProps) => {
  const client = useClient();
  const [rawResponse, setRawResponse] = useState<any>(null);
  const [data, setData] = useState<any[]>([{ group: "value", value: 0 }]);
  const [graphLoadingTitle, setGraphLoadingTitle] = useState<string>(
    "Consulting third party sources. . ."
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [options, setOptions] = useState<GaugeChartOptions>(graphOptions);

  const getMatchedCertifications = async () => {
    try {
      const res = await client.getMatchedCertifications();
      setData(parseMatchedCertification(res));
      setRawResponse(res);
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
      hasAI
    >
      <GaugeChart data={data} options={options} />
      {rawResponse && (
        <p style={{ marginTop: 32 }}>
          Out of{" "}
          <span className={utilsStyles.textAccentPurple}>
            {rawResponse.total_certifications_analysed}
          </span>{" "}
          unique certifications on the provided internal datset, we only found{" "}
          <span className={utilsStyles.textAccentBlue}>
            {rawResponse.number_of_matched_certifications}
          </span>{" "}
          that matched with today&apos;s top industry courses.
        </p>
      )}
    </GraphCard>
  );
};

export default MatchedCertifications;
