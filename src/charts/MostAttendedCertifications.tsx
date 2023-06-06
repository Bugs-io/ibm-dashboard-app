import { useEffect, useMemo, useState } from "react";
import GraphCard from "@/components/GraphCard"
import useClient from "@/hooks/useClient";
import { SimpleBarChart } from "@carbon/charts-react";

interface Props {
  id: string;
  isInteractive: boolean;
}

type Certification = {
  name: string;
  total_attendees: number;
}

const graphOptions = {
  axes: {
    left: {
      mapsTo: "group",
      scaleType: "labels",
    },
    bottom: {
      mapsTo: "total_attendees",
    }
  },
  height: "400px",
  theme: "g90",
}

const parseCertifications = (certifications: Certification[]) => certifications.map(
  ({ name, total_attendees }) => ({
    group: name,
    total_attendees
  })
);

const MostAttendedCertifications = ({ id, isInteractive }: Props) => {
  const client = useClient();

  const [data, setData] = useState<any>([]);
  // TODO: add logic for loading state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setIsLoading] = useState<boolean>(true);

  const getMostAttendedCertifications = async () => {
    try {
      setIsLoading(true);
      const response = await client.getMostAttendedCertifications(5, "last_year");
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const certifications = useMemo(() => {
    if (!data.certifications) {
      return [];
    }
    return parseCertifications(data.certifications);
  }, [data]);

  useEffect(() => {
    getMostAttendedCertifications();
  }, []);

  return (
    <GraphCard
      id={id}
      title="Most Attended Certifications"
      isInteractive={isInteractive}
    >
      <SimpleBarChart
        data={certifications}
        options={graphOptions}
      />
    </GraphCard>
  )

}

export default MostAttendedCertifications;
