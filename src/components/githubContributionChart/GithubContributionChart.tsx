import { ScrollArea } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { axiosConfig } from "../../utils/axiosConfig";
import ContributionBox from "./ContributionBox";

interface Contribution {
  id: number;
  date: string;
  count: number;
  level: number;
}

export default function GithubContributionChart() {
  const viewport = useRef<HTMLDivElement>(null);
  const [githubData, setGitHubData] = useState<Contribution[]>([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      await axiosConfig
        .get("/last_year_contributions")
        .then((response) => {
          setGitHubData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchGitHubData();
  }, []);

  useEffect(() => {
    const scrollToEnd = () => {
      viewport.current!.scrollTo({
        left: viewport.current!.scrollWidth,
        behavior: "smooth",
      });
    };

    if (githubData.length > 0) {
      scrollToEnd();
    }
  }, [githubData]);

  return (
    <ScrollArea offsetScrollbars scrollbars="x" viewportRef={viewport}>
      <div className="flex flex-row items-start">
        {githubData &&
          githubData
            .reduce((acc: Contribution[][], _, i) => {
              if (i % 7 === 0) acc.push([]);
              acc[acc.length - 1].push(githubData[i]);
              return acc;
            }, [])
            .map((columnData, columnIndex) => (
              <div key={columnIndex} className="flex flex-col">
                {columnData.map((data, index) => (
                  <ContributionBox key={index} {...data} />
                ))}
              </div>
            ))}
      </div>
    </ScrollArea>
  );
}
