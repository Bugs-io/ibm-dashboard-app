import { ChartTabularData } from "@carbon/charts/interfaces";
import { TagTypeName } from "carbon-components-react";

interface GraphTitles {
  [key: string]: string;
  "Software Development": string;
  "Data Analytics": string;
  "Project Management": string;
  Cybersecurity: string;
  "Cloud Computing": string;
  "Mainframe and Systems": string;
}

export type CertificationItem = {
  uid: string;
  category: string;
  certifications: number;
};

export const GRAPH_TITLES: GraphTitles = {
  "Software Development": "SWD",
  "Data Analytics": "DA",
  "Project Management": "PM",
  Cybersecurity: "CYBSEC",
  "Cloud Computing": "CLOUD",
  "Mainframe and Systems": "M&S",
};

export const initialData: ChartTabularData = [
  {
    uid: "IBM",
    category: GRAPH_TITLES["Software Development"],
    certifications: 0,
  },
  {
    uid: "IBM",
    category: GRAPH_TITLES["Data Analytics"],
    certifications: 0,
  },
  {
    uid: "IBM",
    category: GRAPH_TITLES["Project Management"],
    certifications: 0,
  },
  {
    uid: "IBM",
    category: GRAPH_TITLES.Cybersecurity,
    certifications: 0,
  },
  {
    uid: "IBM",
    category: GRAPH_TITLES["Cloud Computing"],
    certifications: 0,
  },
  {
    uid: "IBM",
    category: GRAPH_TITLES["Mainframe and Systems"],
    certifications: 0,
  },
];

export const TAG_TYPES: TagTypeName[] = [
  "purple",
  "teal",
  "cyan",
  "gray",
  "green",
  "high-contrast",
];
