import Availability from "../../components/Availability";
import ContactButtons from "../../components/contactButtons/ContactButtons";
import GithubContributionChart from "../../components/githubContributionChart/GithubContributionChart";

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-10">
      <section className="w-1/2">
        <h1>Hi, I'm Bence</h1>
        <h2>And this is my portfolio</h2>
        <p className="mt-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </section>
      <section>
        <Availability />
      </section>
      <section>
        <ContactButtons />
      </section>
      <section>
        <GithubContributionChart />
      </section>
    </div>
  );
}
