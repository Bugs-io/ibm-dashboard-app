import "@carbon/charts/styles.css";
import { RadarChart } from "@carbon/charts-react";
import { Button, TextInput } from "carbon-components-react";
import { Search } from "@carbon/icons-react";

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

const options = {
  title: "Radar",
  radar: {
    axes: {
      angle: "feature",
      value: "score",
    },
    alignment: "center",
  },
  data: {
    groupMapsTo: "product",
  },
  height: "400px",
  theme: "g90",
};

const SearchRadar = () => (
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
      <Button hasIconOnly renderIcon={() => <Search />} iconDescription="Search" />
    </div>
    <RadarChart data={data} options={options} />
  </div>
);

export default SearchRadar;
