import GithubIcon from "../../assets/icons/github.svg";
import TechStackIcon from "../../assets/icons/stack.svg";
import Availability from "../../components/Availability";
import ContactButtons from "../../components/contactButtons/ContactButtons";
import GithubContributionChart from "../../components/githubContributionChart/GithubContributionChart";
import Journey from "../../components/journey/Journey";
import ShowCase from "../../components/ShowCase";
import TechStack from "../../components/techStack/TechStack";

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-10">
      <section>
        <Availability />
      </section>
      <section className="w-1/2">
        <h1>Hi, I'm Bence</h1>
        <h2>And this is my portfolio</h2>
        <p className="mt-5 text-justify">
          I am an authentic and quick-witted Full Stack Developer with a
          background as an Electrical Engineer. I write my code in a clean,
          testable and maintainable way, with a keen attention to detail, and a
          dedication to quality. I am experienced in problem solving within high
          pressure environments and have the ability to swiftly make
          well-informed, rational decisions. I am persistent yet reasonable, and
          I work well both in a team and by myself.
        </p>
      </section>

      <section>
        <ContactButtons />
      </section>
      <section className="flex flex-row justify-between space-x-10">
        <ShowCase icon={GithubIcon} title="Github Contribution">
          <GithubContributionChart />
        </ShowCase>
        <ShowCase icon={TechStackIcon} title="Tech Stack">
          <TechStack />
        </ShowCase>
      </section>
      <section className="flex flex-col items-center space-y-10 ">
        <h2 className="text-center">My Journey</h2>
        <Journey />
      </section>
    </div>
  );
}
