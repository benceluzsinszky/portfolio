import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../assets/icons/home.svg";

export default function HomeButton() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return (
    <Link to="/" className="w-full">
      <img src={HomeIcon} alt="Home Icon" className="m-2 size-8" />
    </Link>
  );
}
