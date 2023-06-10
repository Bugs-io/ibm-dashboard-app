import GraphCard from "@/components/GraphCard";
import useClient from "@/hooks/useClient";
import { ChartProps } from "@/utils/chartOptions";
import { PieChart } from "@carbon/charts-react";
import { PieChartOptions } from "@carbon/charts/interfaces";
import { useEffect, useState } from "react";

type CertificationCategory = {
  category: string
  certifications: number
}

const baseGraphOptions: PieChartOptions = {
  title: "",
  resizable: true,
  height: "400px",
  theme: "g90",
}

const parseCertificationsDistribution = (certificationCategories: CertificationCategory[]) =>
  certificationCategories.map(({ category, certifications }) => ({
    group: category,
    value: certifications,
  })
);

const CertificationsDistribution = ({ id, isInteractive }: ChartProps) => {
  const client = useClient();

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [graphOptions, setGraphOptions] = useState<PieChartOptions>(baseGraphOptions);

  const getCertificationsDistribution = async () => {
    try {
      setIsLoading(true);
      const response = await client.getCertificationsDistribution();
      setData(parseCertificationsDistribution(response));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCertificationsDistribution();
  }, []);

  useEffect(() => {
    setGraphOptions((prevGraphOptions) => ({
      ...prevGraphOptions,
      data: { loading: isLoading }
    }));
  }, [isLoading]);

  return (
    <GraphCard
      id={id}
      isInteractive={isInteractive}
      title="Certs. distribution"
    >
      <PieChart
        data={data}
        options={graphOptions}
      />
    </GraphCard>
  )
}

export default CertificationsDistribution;
