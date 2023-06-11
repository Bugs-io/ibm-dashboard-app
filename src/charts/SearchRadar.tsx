import { useState } from "react";
import { RadarChart } from "@carbon/charts-react";
import {
  Accordion,
  AccordionItem,
  Button,
  Loading,
  Tag,
  TextInput,
  // @ts-expect-error
  Theme,
} from "carbon-components-react";
import { Search } from "@carbon/icons-react";
import { RadarChartOptions } from "@carbon/charts/interfaces";
import { ChartProps } from "@/utils/chartOptions";
import {
  CertificationItem,
  GRAPH_TITLES,
  initialData,
} from "@/utils/searchRadar";
import GraphCard from "@/components/GraphCard";
import useClient from "@/hooks/useClient";

const options: RadarChartOptions = {
  title: "",
  radar: {
    axes: {
      angle: "category",
      value: "certifications",
    },
    // @ts-expect-error
    alignment: "center",
  },
  data: {
    groupMapsTo: "uid",
  },
  height: "400px",
  // @ts-expect-error
  theme: "g90",
};

const parseResponse = (response: CertificationItem[]) => {
  const parsed = response.map((certification) => {
    const alteredName: string = GRAPH_TITLES[certification.category];
    return {
      ...certification,
      category: alteredName,
    };
  });

  return parsed;
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

      setData(parseResponse(res));
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
        <Accordion>
          <AccordionItem title="Categories Guide" style={{ padding: 0 }}>
            {Object.keys(GRAPH_TITLES).map((title) => (
              <div
                key={`tag_${GRAPH_TITLES[title]}`}
                style={{ marginBottom: 4 }}
              >
                <Theme
                  theme="white"
                  style={{ display: "inline", backgroundColor: "#262623" }}
                >
                  <Tag type="purple" size="sm">
                    {GRAPH_TITLES[title]}
                  </Tag>
                </Theme>
                <span style={{ fontSize: 14 }}>: {title}</span>
              </div>
            ))}
          </AccordionItem>
        </Accordion>
      </div>
    </GraphCard>
  );
};

export default SearchRadar;
