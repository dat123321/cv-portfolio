import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/portfolio.json");

export type PortfolioData = {
  personal: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    website: string;
    avatar: string;
    available: boolean;
  };
  about: {
    bio: string;
    highlights: string[];
  };
  skills: Array<{ category: string; items: string[] }>;
  experience: Array<{
    id: string;
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    tags: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    link: string | null;
    github: string | null;
    tags: string[];
    year: string;
  }>;
};

export function readPortfolio(): PortfolioData {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as PortfolioData;
}

export function writePortfolio(data: PortfolioData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}
