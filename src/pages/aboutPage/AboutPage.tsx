export default function AboutPage() {
  return (
    <div className="space-y-5">
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
