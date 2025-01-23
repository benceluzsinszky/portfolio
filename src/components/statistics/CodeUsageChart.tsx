import { PieChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import { useEffect, useState } from "react";
import { axiosConfig } from "../../utils/axiosConfig";

type CodeUsage = {
  language: string;
  count: number;
};

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
  const [codeUsage, setCodeUsage] = useState<CodeUsage[]>([]);

  const parseChartData = () => {
    const totalUsage = codeUsage.reduce((acc, curr) => acc + curr.count, 0);

    const usageData = codeUsage.map(({ language, count }) => ({
      name: language,
      value: count / totalUsage,
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
    const fetchCodeUsage = async () => {
      await axiosConfig
        .get(`/language_usage`)
        .then((response) => {
          setCodeUsage(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchCodeUsage();
  }, []);

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
