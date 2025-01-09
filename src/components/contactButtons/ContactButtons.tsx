import GithubIcon from "../../assets/icons/github.svg";
import ContactButton from "./ContactButton";

export default function ContactButtons() {
  return (
    <div className="flex space-x-5">
      <ContactButton
        href="https://github.com/benceluzsinszky"
        icon={GithubIcon}
        alt="Github"
      />
    </div>
  );
}
