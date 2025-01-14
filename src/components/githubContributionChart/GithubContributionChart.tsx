import { ScrollArea } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import ContributionBox from "./ContributionBox";

type Contribution = {
  date: string;
  count: number;
  level: number;
};

export default function GithubContributionChart() {
  const [githubData, setGitHubData] = useState<Contribution[]>([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      await axios
        .get(
          "https://github-contributions-api.jogruber.de/v4/benceluzsinszky?y=last"
        )
        .then((response) => {
          setGitHubData(response.data.contributions);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchGitHubData();
  }, []);

  return (
    <ScrollArea offsetScrollbars scrollbars="x">
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
