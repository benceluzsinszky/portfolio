import { PieChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

type Repo = {
  name: string;
};

type CodeUsage = {
  [key: string]: number;
};

const gitHubAccessToken = import.meta.env.VITE_GITHUB_PAT;

const languageColors: { [key: string]: string } = {
  Batchfile: "gray.6",
  "C#": "blue.6",
  CSS: "blue.5",
  Dockerfile: "cyan.6",
  Go: "cyan.4",
  HTML: "red.8",
  Java: "green.6",
  JavaScript: "yellow.5",
  Python: "blue.7",
  Shell: "gray.6",
  TypeScript: "indigo.9",
};

export default function CodeUsageChart() {
  const [repos, setRepos] = useState<string[]>([]);
  const [codeUsage, setCodeUsage] = useState<CodeUsage>({});

  const parseChartData = () => {
    const totalUsage = Object.values(codeUsage).reduce(
      (acc, curr) => acc + curr,
      0
    );

    const usageData = Object.entries(codeUsage).map(([language, usage]) => ({
      name: language,
      value: usage / totalUsage,
      color: languageColors[language] || "gray.6",
    }));

    const others = usageData
      .filter((data) => data.value <= 0.03)
      .reduce(
        (acc, curr) => ({
          name: "Other",
          value: acc.value + curr.value,
          color: "gray.6",
        }),
        { name: "Other", value: 0, color: "gray.6" }
      );

    const filteredData = usageData.filter((data) => data.value > 0.03);

    if (others.value > 0) {
      filteredData.push(others);
    }

    return filteredData.sort((a, b) => b.value - a.value);
  };

  useEffect(() => {
    const fetchRepos = async () => {
      await axios
        .get("https://api.github.com/users/benceluzsinszky/repos", {
          headers: {
            Authorization: `token ${gitHubAccessToken}`,
          },
        })
        .then((response) => {
          const repoNames = response.data.map((repo: Repo) => repo.name);
          setRepos(repoNames);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchRepos();
  }, []);

  useEffect(() => {
    const fetchCodeUsage = async () => {
      const updatedCodeUsage: { [key: string]: number } = {};

      await Promise.all(
        repos.map(async (repo) => {
          const response = await axios.get(
            `https://api.github.com/repos/benceluzsinszky/${repo}/languages`,
            {
              headers: {
                Authorization: `token ${gitHubAccessToken}`,
              },
            }
          );

          const repoCodeUsage: { [key: string]: number } = response.data;

          for (const [language, usage] of Object.entries(repoCodeUsage)) {
            if (updatedCodeUsage[language]) {
              updatedCodeUsage[language] += usage;
            } else {
              updatedCodeUsage[language] = usage;
            }
          }
        })
      );

      setCodeUsage(updatedCodeUsage);
    };
    fetchCodeUsage();
  }, [repos]);

  return (
    <PieChart
      data={parseChartData()}
      withLabels
      labelsPosition="outside"
      labelsType="percent"
      withTooltip
      tooltipDataSource="segment"
      valueFormatter={(value: number) => `${(value * 100).toFixed(0)}%`}
      mx="auto"
      my="auto"
    />
  );
}
