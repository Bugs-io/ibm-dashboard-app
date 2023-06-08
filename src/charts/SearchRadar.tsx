import { useState } from "react";
import { RadarChart } from "@carbon/charts-react";
import { Button, Loading, TextInput } from "carbon-components-react";
import { Search } from "@carbon/icons-react";
import { ChartTabularData, RadarChartOptions } from "@carbon/charts/interfaces";
import { ChartProps } from "@/utils/chartOptions";
import GraphCard from "@/components/GraphCard";
import useClient from "@/hooks/useClient";

const initialData: ChartTabularData = [
  {
    uid: "IBM",
    category: "Software Development",
    certifications: 0,
  },
  {
    uid: "IBM",
    category: "Data Analytics",
    certifications: 0,
  },
  {
    uid: "IBM",
    category: "Project Management",
    certifications: 0,
  },
  {
    uid: "IBM",
    category: "Cybersecurity",
    certifications: 0,
  },
  {
    uid: "IBM",
    category: "Cloud Computing",
    certifications: 0,
  },
  {
    uid: "IBM",
    category: "Mainframe and Systems",
    certifications: 0,
  },
];

const options: RadarChartOptions = {
  title: "",
  radar: {
    axes: {
      angle: "category",
      value: "certifications",
    },
    // @ts-expect-error
    alignment: "uid",
  },
  alignment: "center",
  data: {
    groupMapsTo: "uid",
  },
  height: "400px",
  // @ts-expect-error
  theme: "g90",
};

const SearchRadar = ({ id, isInteractive }: ChartProps) => {
  const client = useClient();
  const [data, setData] = useState<any[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>("");

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const res = await client.getCertificationCategorizedByEmployee(
        searchData
      );

      setData(res);
    } catch (error) {
      setIsLoading(false);
      setData(initialData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchData(value);
  };

  return (
    <GraphCard
      id={id}
      isInteractive={isInteractive}
      title="User course strength"
    >
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
            onChange={(e) => handleChange(e)}
            value={searchData}
          />
          <Button
            hasIconOnly
            renderIcon={() =>
              isLoading ? <Loading withOverlay={false} small /> : <Search />
            }
            iconDescription="Search"
            onSubmit={getCategories}
            onClick={getCategories}
          />
        </div>

        <RadarChart data={data} options={options} />
      </div>
    </GraphCard>
  );
};

export default SearchRadar;
