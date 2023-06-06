import "@carbon/charts/styles.css";
import { RadarChart } from "@carbon/charts-react";
import { Button, TextInput } from "carbon-components-react";
import { Search } from "@carbon/icons-react";
import { RadarChartOptions } from "@carbon/charts/interfaces";
import { ChartProps } from "@/utils/chartOptions";
import GraphCard from "@/components/GraphCard";

const data = [
  {
    product: "Product 1",
    feature: "Price",
    score: 60,
  },
  {
    product: "Product 1",
    feature: "Usability",
    score: 92,
  },
  {
    product: "Product 1",
    feature: "Availability",
    score: 5,
  },
  {
    product: "Product 1",
    feature: "Performance",
    score: 85,
  },
  {
    product: "Product 1",
    feature: "Quality",
    score: 60,
  },
  {
    product: "Product 2",
    feature: "Price",
    score: 70,
  },
  {
    product: "Product 2",
    feature: "Usability",
    score: 63,
  },
  {
    product: "Product 2",
    feature: "Availability",
    score: 78,
  },
  {
    product: "Product 2",
    feature: "Performance",
    score: 50,
  },
  {
    product: "Product 2",
    feature: "Quality",
    score: 30,
  },
];

const options: RadarChartOptions = {
  title: "Radar",
  radar: {
    axes: {
      angle: "feature",
      value: "score",
    },
    // @ts-expect-error
    alignment: "center",
  },
  data: {
    groupMapsTo: "product",
  },
  height: "400px",
  // @ts-expect-error
  theme: "g90",
};

const SearchRadar = ({ id, isInteractive }: ChartProps) => (
  <GraphCard id={id} isInteractive={isInteractive} title="User course strength">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        paddingTop: "16px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <TextInput
          id="SearchInput"
          labelText=""
          placeholder="Search employee by ID"
          size="lg"
        />
        <Button
          hasIconOnly
          renderIcon={() => <Search />}
          iconDescription="Search"
        />
      </div>
      <RadarChart data={data} options={options} />
    </div>
  </GraphCard>
);

export default SearchRadar;
