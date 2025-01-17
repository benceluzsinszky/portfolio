import { Helmet } from "react-helmet";
import GithubIcon from "../../assets/icons/github.svg";
import TechStackIcon from "../../assets/icons/stack.svg";
import Availability from "../../components/Availability";
import ContactButtons from "../../components/contactButtons/ContactButtons";
import GithubContributionChart from "../../components/githubContributionChart/GithubContributionChart";
import Journey from "../../components/journey/Journey";
import ScrollLoadingBar from "../../components/ScrollLoadingBar";
import ShowCase from "../../components/ShowCase";
import TechStack from "../../components/techStack/TechStack";

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-10">
      <Helmet>
        <title>Bence Luzsinszky</title>
        <meta
          name="description"
          content="Bence Luzsinszky's portfolio website"
        />
        <link rel="icon" href="/code.svg" />
      </Helmet>
      <ScrollLoadingBar />
      <section>
        <Availability />
      </section>
      <section className="md:w-1/2">
        <h1>Hi, I'm Bence</h1>
        <h2>And this is my portfolio</h2>
        <p className="mt-5 text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </section>

      <section>
        <ContactButtons />
      </section>
      <section className="flex flex-col md:flex-row justify-between space-y-10 md:space-y-0 md:space-x-10">
        <ShowCase icon={GithubIcon} title="Github Contribution">
          <GithubContributionChart />
        </ShowCase>
        <ShowCase icon={TechStackIcon} title="Tech Stack">
          <TechStack />
        </ShowCase>
      </section>
      <section className="flex flex-col items-start md:items-center space-y-5 md:space-y-10 ">
        <h2 className="text-center">My Journey</h2>
        <Journey />
      </section>
    </div>
  );
}
