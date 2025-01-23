import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { axiosConfig } from "../../utils/axiosConfig";

export default function Statistics() {
  const [gitHubContributions, setGitHubContributions] = useState<number>(0);
  const [linesOfCode, setLinesOfCode] = useState<number>(0);

  const calculateWorkHours = () => {
    const startOkto = new Date("2023-11-01");
    const endOkto = new Date("2024-09-30");
    const oktoWeeks = Math.round(
      (endOkto.getTime() - startOkto.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
    const oktoHours = oktoWeeks * 24;

    const startItu = new Date("2024-10-01");
    const endItu = new Date(Date.now());
    const ituWeeks = Math.round(
      (endItu.getTime() - startItu.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
    const ituHours = ituWeeks * 12;

    return oktoHours + ituHours;
  };

  useEffect(() => {
    const fetchTotalContributions = async () => {
      await axiosConfig
        .get("/total_contributions")
        .then((response) => {
          setGitHubContributions(response.data.total_contributions);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchTotalContributions();
  }, []);

  useEffect(() => {
    const fetchTotalLinesOfCode = async () => {
      await axiosConfig
        .get("/total_lines")
        .then((response) => {
          console.log(response.data);
          setLinesOfCode(response.data.total_lines);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchTotalLinesOfCode();
  }, []);

  return (
    <div className="flex flex-col justify-evenly h-full">
      <div>
        <h3>
          <CountUp end={calculateWorkHours()} duration={2} />
        </h3>
        <p>hours worked in software development</p>
      </div>
      <div>
        <h3 className="mt-5">
          <CountUp end={gitHubContributions} duration={2} />
        </h3>
        <p>GitHub contributions</p>
      </div>
      <div>
        <h3 className="mt-5">
          <CountUp end={linesOfCode} duration={2} />
        </h3>
        <p>lines of code pushed to GitHub</p>
      </div>
    </div>
  );
}
