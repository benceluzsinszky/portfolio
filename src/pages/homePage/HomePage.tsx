import GithubIcon from "../../assets/icons/github.svg";
import TechStackIcon from "../../assets/icons/stack.svg";
import Availability from "../../components/Availability";
import ContactButtons from "../../components/contactButtons/ContactButtons";
import GithubContributionChart from "../../components/githubContributionChart/GithubContributionChart";
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
        <p className="mt-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </section>

      <section>
        <ContactButtons />
      </section>
      <section className="flex flex-row justify-between space-x-10">
        <ShowCase
          icon={GithubIcon}
          title="Github Contribution"
          element={<GithubContributionChart />}
        />
        <ShowCase
          icon={TechStackIcon}
          title="Tech Stack"
          element={<TechStack />}
        />
      </section>
    </div>
  );
}
