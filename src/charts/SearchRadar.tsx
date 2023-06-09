import { useEffect, useState } from "react";
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
import styles from "./styles.module.scss";

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
  const [IBMGeneralData, setIBMGeneralData] = useState<any[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>("");

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const res = await client.getCertificationsCategorized();
      const parsedResponse = parseResponse(res);
      setData(parsedResponse);
      setIBMGeneralData(parsedResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoriesFromEmployee = async () => {
    try {
      setIsSearchLoading(true);
      const res = await client.getCertificationsCategorizedByEmployee(
        searchData
      );
      setData(parseResponse(res));
    } catch (error) {
      setIsSearchLoading(false);
      setData(IBMGeneralData);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchData(value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    getCategoriesFromEmployee();
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <GraphCard
      id={id}
      isInteractive={isInteractive}
      title="Preparation strength"
      hasAI
    >
      <div className={styles["searchRadar-container"]}>
        <div className={styles["searchRadar-searchBar"]}>
          <TextInput
            id="SearchInput"
            labelText=""
            placeholder="Search employee by ID"
            size="lg"
            onChange={(e) => handleChange(e)}
            value={searchData}
            onKeyDown={(e) => handleEnter(e)}
          />
          <Button
            hasIconOnly
            renderIcon={() =>
              isSearchLoading ? (
                <Loading withOverlay={false} small />
              ) : (
                <Search />
              )
            }
            iconDescription="Search"
            onSubmit={getCategoriesFromEmployee}
            onClick={getCategoriesFromEmployee}
          />
        </div>

        {isLoading ? (
          <div className={styles["searchRadar-loading"]}>
            <Loading withOverlay={false} />
          </div>
        ) : (
          <RadarChart data={data} options={options} />
        )}

        <Accordion>
          <AccordionItem title="Categories Guide">
            {Object.keys(GRAPH_TITLES).map((title) => (
              <div
                key={`tag_${GRAPH_TITLES[title]}`}
                className={styles["searchRadar-tagCointainer"]}
              >
                <Theme theme="white" className={styles["searchRadar-tagTheme"]}>
                  <Tag type="purple" size="sm">
                    {GRAPH_TITLES[title]}
                  </Tag>
                </Theme>
                <span className={styles["searchRadar-tagDescription"]}>
                  : {title}
                </span>
              </div>
            ))}
          </AccordionItem>
        </Accordion>
      </div>
    </GraphCard>
  );
};

export default SearchRadar;
