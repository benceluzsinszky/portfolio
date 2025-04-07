import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center h-10 space-x-3 mx-5">
      <p className="text-xs md:text-base">
        &copy; 2025 Bence Luzsinszky. All rights reserved.
      </p>
      <p className="hidden md:block">&middot;</p>
      <Link className="underline text-xs md:text-base" to="/about">
        About
      </Link>
    </footer>
  );
}
