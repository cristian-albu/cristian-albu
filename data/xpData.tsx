import { TechUsed, techUsedObj } from "./skill";

export interface XpData {
  title: string;
  at: string;
  type: "work" | "learning";
  startingDate: Date;
  endingDate: Date;
  images: string[];
  category: "course" | "school" | "job" | "freelance" | "mock";
  techUsed: TechUsed[];
  description: string;
  link?: string;
}

export const xpData: XpData[] = [
  {
    title: "Full-stack Developer",
    at: "Koddezign",
    link: "https://www.koddezign.com",
    type: "work",
    images: [""],
    startingDate: new Date("2022-12"),
    endingDate: new Date(),
    category: "job",
    techUsed: [techUsedObj.nextjs],
    description: "",
  },
];
