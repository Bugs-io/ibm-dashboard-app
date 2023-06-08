import { useState, useEffect } from "react";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  DataTableSkeleton,
} from "carbon-components-react";
import GraphCard from "@/components/GraphCard";
import { ChartProps } from "@/utils/chartOptions";
import useClient from "@/hooks/useClient";

type Course = { group: string; value: string };

type TableRowType = {
  id: string;
  name: string;
  status: string;
};

const NUMBER_OF_COURSES_ON_TOP = 5;

const tableHeaders = [
  {
    key: "id",
    header: "Top",
  },
  {
    key: "name",
    header: "Course",
  },
  {
    key: "status",
    header: "Attendees",
  },
];

const parseCourses = (responseCourses: Course[]) => {
  const topNCourses = responseCourses.slice(0, NUMBER_OF_COURSES_ON_TOP);
  const parsed: TableRowType[] = topNCourses.map((course, i) => ({
    id: (i + 1).toString(),
    name: course.group,
    status: course.value,
  }));

  return parsed;
};

const TopIndustryCourses = ({ id, isInteractive }: ChartProps) => {
  const client = useClient();
  const [data, setData] = useState<TableRowType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTopIndustryCourses = async () => {
    try {
      setIsLoading(true);
      const response = await client.getTopIndustryCourses();
      console.log(parseCourses(response));
      setData(parseCourses(response));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopIndustryCourses();
  }, []);

  return (
    <GraphCard
      title="Top courses from the industry"
      id={id}
      isInteractive={isInteractive}
    >
      <div style={{ marginBottom: 16 }} />

      {isLoading ? (
        <DataTableSkeleton
          headers={tableHeaders}
          rowCount={NUMBER_OF_COURSES_ON_TOP}
          columnCount={tableHeaders.length}
          compact
          showToolbar={false}
          showHeader={false}
        />
      ) : (
        // @ts-expect-error
        <DataTable rows={data} headers={tableHeaders} isSortable>
          {
            // @ts-expect-error
            ({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {
                      // @ts-expect-error
                      headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    // @ts-expect-error
                    rows.map((row) => (
                      <TableRow {...getRowProps({ row })}>
                        {
                          // @ts-expect-error
                          row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))
                        }
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            )
          }
        </DataTable>
      )}
    </GraphCard>
  );
};

export default TopIndustryCourses;
