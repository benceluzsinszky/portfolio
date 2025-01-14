import { Link } from "react-router-dom";

type ContactButtonProps = {
  href: string;
  icon: string;
  alt: string;
};

export default function ContactButton({ href, icon, alt }: ContactButtonProps) {
  return (
    <Link
      to={href}
      className="transform transition-transform brightness-90 duration-100 hover:brightness-110 hover:scale-110 active:translate-y-1"
      title={alt}
    >
      <img src={icon} alt={alt} className="w-10 h-10" />
    </Link>
  );
}
