/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import "@carbon/charts/styles.css";
import { SimpleBarChart } from "@carbon/charts-react";
import { BarChartOptions, ChartTabularData } from "@carbon/charts/interfaces";

interface Props {
  data: ChartTabularData;
  options: BarChartOptions;
}

const Sample = ({ data, options }: Props) => {
  
  return <SimpleBarChart data={data} options={options} />;
};

export default Sample;
