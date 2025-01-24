import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="inline-flex items-center h-10 space-x-3">
      <p>&copy; 2025 Bence Luzsinszky. All rights reserved.</p>
      <p>&middot;</p>
      <Link className="underline" to="/about">
        About
      </Link>
    </footer>
  );
}
