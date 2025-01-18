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

    return Object.entries(codeUsage)
      .sort(([, a], [, b]) => b - a)
      .map(([language, usage]) => ({
        name: language,
        value: usage,
        color: languageColors[language] || "gray.6",
      }))
      .filter((data) => data.value / totalUsage > 0.03);
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
      tooltipProps={{ payload: [{ name: "helllooo" }] }}
      mx="auto"
      my="auto"
    />
  );
}
