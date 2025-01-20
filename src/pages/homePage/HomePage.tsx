import { Helmet } from "react-helmet-async";
import BarChartIcon from "../../assets/icons/chart-bar.svg";
import PieChartIcon from "../../assets/icons/chart-pie.svg";
import GithubIcon from "../../assets/icons/github-thick.svg";
import TechStackIcon from "../../assets/icons/stack.svg";
import Availability from "../../components/Availability";
import ContactButtons from "../../components/contactButtons/ContactButtons";
import GithubContributionChart from "../../components/githubContributionChart/GithubContributionChart";
import Journey from "../../components/journey/Journey";
import ScrollLoadingBar from "../../components/ScrollLoadingBar";
import ShowCase from "../../components/ShowCase";
import CodeUsageChart from "../../components/statistics/CodeUsageChart";
import Statistics from "../../components/statistics/Statistics";
import TechStack from "../../components/techStack/TechStack";

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-10">
      <Helmet>
        <title>Home - Bence's Portfolio</title>
        <meta
          name="description"
          content="Welcome to my portfolio. Full Stack Developer with a background in Electrical Engineering."
        />
        <meta
          name="keywords"
          content="Bence, Luzsisnzky, benceluzsisnzky, Portfolio, Full Stack Developer, Electrical Engineering, Software Design, ITU"
        />
      </Helmet>
      <ScrollLoadingBar />
      <section>
        <Availability />
      </section>
      <section className="md:w-1/2">
        <h1>Hi, I'm Bence</h1>
        <h2>And this is my portfolio</h2>
        <p className="mt-5">
          I am a Full Stack develpoper with a background in Electrical
          Engineering. I will graduate MSc in Software Design from the IT
          University of Copenhagen in the Summer of 2025.
        </p>
      </section>

      <section>
        <ContactButtons />
      </section>
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between space-y-10 md:space-y-0 md:space-x-10">
          <ShowCase icon={BarChartIcon} title="Statistics">
            <Statistics />
          </ShowCase>
          <ShowCase icon={PieChartIcon} title="Language Usage">
            <CodeUsageChart />
          </ShowCase>
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-10 md:space-y-0 md:space-x-10">
          <ShowCase icon={GithubIcon} title="Github Contribution">
            <GithubContributionChart />
          </ShowCase>
          <ShowCase icon={TechStackIcon} title="Tech Stack">
            <TechStack />
          </ShowCase>
        </div>
      </section>
      <section className="flex flex-col items-start md:items-center space-y-5 md:space-y-10 ">
        <h2 className="text-center">My Journey</h2>
        <Journey />
      </section>
    </div>
  );
}
