import CVIcon from "../../assets/icons/cv.svg";
import GithubIcon from "../../assets/icons/github.svg";
import LinkedInIcon from "../../assets/icons/linkedin.svg";
import MailIcon from "../../assets/icons/mail.svg";
import ContactButton from "./ContactButton";

export default function ContactButtons() {
  return (
    <div className="flex space-x-3">
      <ContactButton
        href="https://github.com/benceluzsinszky"
        icon={GithubIcon}
        alt="GitHub"
      />
      <ContactButton
        href="https://www.linkedin.com/in/benceluzsinszky/"
        icon={LinkedInIcon}
        alt="LinkedIn"
      />
      <ContactButton href="/cv" icon={CVIcon} alt="Resume" />
      <ContactButton
        href="mailto:benceluzsinszky@gmail.com"
        icon={MailIcon}
        alt="Email"
      />
    </div>
  );
}
