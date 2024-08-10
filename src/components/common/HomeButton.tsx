import { Link } from "react-router-dom";
import "./HomeButton.css";

export default function HomeButton() {
  return (
    <>
      <Link to="/">
        <button className="home-button">
          <img src="/home.png"></img>
        </button>
      </Link>
    </>
  );
}
