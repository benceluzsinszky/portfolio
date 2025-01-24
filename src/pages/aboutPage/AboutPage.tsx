import { Helmet } from "react-helmet-async";
import ogImage from "../../assets/og_image.png";

export default function AboutPage() {
  return (
    <div className="space-y-5">
      <Helmet>
        <title>About - Bence Luzsinszky</title>
        <meta
          name="description"
          content="Welcome to my portfolio. Full Stack Developer with a background in Electrical Engineering."
        />
        <meta
          name="keywords"
          content="Bence, Luzsisnzky, benceluzsisnzky, Portfolio, Full Stack Developer, Electrical Engineering, Software Design, ITU"
        />
        <meta property="og:title" content="About - Bence Luzsinszky" />
        <meta
          property="og:description"
          content="Welcome to my portfolio. Full Stack Developer with a background in Electrical Engineering."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://benceluzsinszky.com" />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About - Bence Luzsisnzky" />
        <meta
          name="twitter:description"
          content="Welcome to my portfolio. Full Stack Developer with a background in Electrical Engineering."
        />
        <meta name="twitter:image" content={ogImage} />
        <meta name="author" content="Bence Luzsisnzky" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <h1>Portfolio</h1>
      <p>
        The aim of the project is to showcase my experiences and projects in a
        visually appealing way. The website is built with React TS and Tailwind
        CSS. The website is hosted on Vercel and the source code is available on{" "}
        <a
          href="https://github.com/benceluzsinszky/portfolio"
          className="underline"
        >
          GitHub
        </a>
        .
      </p>
      <p>
        All the data is fetched from a REST API built with FastAPI deployed on
        DigitalOcean. The API is crawling data from the GitHub APIs and storing
        it in a PostgreSQL database. The source code is available on{" "}
        <a
          href="https://github.com/benceluzsinszky/portfolio-backend"
          className="underline"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
}
