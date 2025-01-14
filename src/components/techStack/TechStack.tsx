import AWSIcon from "../../assets/icons/techstack/AWS.svg";
import DockerIcon from "../../assets/icons/techstack/Docker.svg";
import FastAPIIcon from "../../assets/icons/techstack/FastAPI.svg";
import FlaskIcon from "../../assets/icons/techstack/Flask.svg";
import GolangIcon from "../../assets/icons/techstack/Go.svg";
import JavaIcon from "../../assets/icons/techstack/Java.svg";
import LinuxIcon from "../../assets/icons/techstack/Linux.svg";
import DotNetIcon from "../../assets/icons/techstack/NET core.svg";
import NodeIcon from "../../assets/icons/techstack/Node.js.svg";
import PostgresIcon from "../../assets/icons/techstack/PostgresSQL.svg";
import PythonIcon from "../../assets/icons/techstack/Python.svg";
import ReactIcon from "../../assets/icons/techstack/React.svg";
import TailwindIcon from "../../assets/icons/techstack/Tailwind CSS.svg";
import TypeScriptIcon from "../../assets/icons/techstack/TypeScript.svg";
import TechStackItem from "./TechStackItem";

export default function TechStack() {
  return (
    <div className="flex flex-col flex-wrap justify-center space-y-2">
      <div className="flex flex-row space-x-2">
        <TechStackItem icon={TypeScriptIcon} alt="TypeScript" />
        <TechStackItem icon={ReactIcon} alt="React" />
        <TechStackItem icon={TailwindIcon} alt="Tailwind CSS" />
        <TechStackItem icon={NodeIcon} alt="Node.js" />
        <TechStackItem icon={PythonIcon} alt="Python" />
        <TechStackItem icon={FastAPIIcon} alt="FastAPI" />
        <TechStackItem icon={FlaskIcon} alt="Flask" />
      </div>

      <div className="flex flex-row items-center space-x-2">
        <TechStackItem icon={DotNetIcon} alt="ASP.NET" />
        <TechStackItem icon={GolangIcon} alt="Go" />
        <TechStackItem icon={JavaIcon} alt="Java" />
        <TechStackItem icon={PostgresIcon} alt="PostgresSQL" />
        <TechStackItem icon={DockerIcon} alt="Docker" />
        <TechStackItem icon={AWSIcon} alt="AWS" />
        <TechStackItem icon={LinuxIcon} alt="Linux" />
      </div>
    </div>
  );
}
