import Availability from "../../components/Availability";
import GithubContributionChart from "../../components/githubContributionChart/GithubContributionChart";

export default function HomePage() {
  return (
    <div>
      <Availability />
      <h1>Hi, I'm Bence</h1>
      <h2>And this is my portfolio</h2>
      <p>I am a software engineer with</p>
      <GithubContributionChart />
    </div>
  );
}
