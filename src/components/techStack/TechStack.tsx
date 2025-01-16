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
    <div className="flex flex-col flex-wrap justify-around space-y-2 h-full w-full mb-3">
      <div className="inline-flex flex-nowrap w-full overflow-hidden group [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-50px),transparent_100%)]">
        <div className="flex items-center justify-center animate-scroll-left group-hover:paused">
          <TechStackItem icon={TypeScriptIcon} alt="TypeScript" />
          <TechStackItem icon={ReactIcon} alt="React" />
          <TechStackItem icon={TailwindIcon} alt="Tailwind CSS" />
          <TechStackItem icon={NodeIcon} alt="Node.js" />
          <TechStackItem icon={PythonIcon} alt="Python" />
          <TechStackItem icon={FastAPIIcon} alt="FastAPI" />
          <TechStackItem icon={FlaskIcon} alt="Flask" />
        </div>
        <div className="flex items-center justify-center animate-scroll-left group-hover:paused">
          <TechStackItem icon={TypeScriptIcon} alt="TypeScript" />
          <TechStackItem icon={ReactIcon} alt="React" />
          <TechStackItem icon={TailwindIcon} alt="Tailwind CSS" />
          <TechStackItem icon={NodeIcon} alt="Node.js" />
          <TechStackItem icon={PythonIcon} alt="Python" />
          <TechStackItem icon={FastAPIIcon} alt="FastAPI" />
          <TechStackItem icon={FlaskIcon} alt="Flask" />
        </div>
        <div className="flex items-center justify-center animate-scroll-left group-hover:paused">
          <TechStackItem icon={TypeScriptIcon} alt="TypeScript" />
          <TechStackItem icon={ReactIcon} alt="React" />
          <TechStackItem icon={TailwindIcon} alt="Tailwind CSS" />
          <TechStackItem icon={NodeIcon} alt="Node.js" />
          <TechStackItem icon={PythonIcon} alt="Python" />
          <TechStackItem icon={FastAPIIcon} alt="FastAPI" />
          <TechStackItem icon={FlaskIcon} alt="Flask" />
        </div>
        <div className="flex items-center justify-center animate-scroll-left group-hover:paused">
          <TechStackItem icon={TypeScriptIcon} alt="TypeScript" />
          <TechStackItem icon={ReactIcon} alt="React" />
          <TechStackItem icon={TailwindIcon} alt="Tailwind CSS" />
          <TechStackItem icon={NodeIcon} alt="Node.js" />
          <TechStackItem icon={PythonIcon} alt="Python" />
          <TechStackItem icon={FastAPIIcon} alt="FastAPI" />
          <TechStackItem icon={FlaskIcon} alt="Flask" />
        </div>
      </div>

      <div className="inline-flex flex-nowrap w-full overflow-hidden group [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-50px),transparent_100%)]">
        <div className="flex items-center justify-center animate-scroll-right group-hover:paused">
          <TechStackItem icon={DotNetIcon} alt="ASP.NET" />
          <TechStackItem icon={GolangIcon} alt="Go" />
          <TechStackItem icon={JavaIcon} alt="Java" />
          <TechStackItem icon={PostgresIcon} alt="PostgresSQL" />
          <TechStackItem icon={DockerIcon} alt="Docker" />
          <TechStackItem icon={AWSIcon} alt="AWS" />
          <TechStackItem icon={LinuxIcon} alt="Linux" />
        </div>
        <div className="flex items-center justify-center animate-scroll-right group-hover:paused">
          <TechStackItem icon={DotNetIcon} alt="ASP.NET" />
          <TechStackItem icon={GolangIcon} alt="Go" />
          <TechStackItem icon={JavaIcon} alt="Java" />
          <TechStackItem icon={PostgresIcon} alt="PostgresSQL" />
          <TechStackItem icon={DockerIcon} alt="Docker" />
          <TechStackItem icon={AWSIcon} alt="AWS" />
          <TechStackItem icon={LinuxIcon} alt="Linux" />
        </div>
        <div className="flex items-center justify-center animate-scroll-right group-hover:paused">
          <TechStackItem icon={DotNetIcon} alt="ASP.NET" />
          <TechStackItem icon={GolangIcon} alt="Go" />
          <TechStackItem icon={JavaIcon} alt="Java" />
          <TechStackItem icon={PostgresIcon} alt="PostgresSQL" />
          <TechStackItem icon={DockerIcon} alt="Docker" />
          <TechStackItem icon={AWSIcon} alt="AWS" />
          <TechStackItem icon={LinuxIcon} alt="Linux" />
        </div>
        <div className="flex items-center justify-center animate-scroll-right group-hover:paused">
          <TechStackItem icon={DotNetIcon} alt="ASP.NET" />
          <TechStackItem icon={GolangIcon} alt="Go" />
          <TechStackItem icon={JavaIcon} alt="Java" />
          <TechStackItem icon={PostgresIcon} alt="PostgresSQL" />
          <TechStackItem icon={DockerIcon} alt="Docker" />
          <TechStackItem icon={AWSIcon} alt="AWS" />
          <TechStackItem icon={LinuxIcon} alt="Linux" />
        </div>
      </div>
    </div>
  );
}
