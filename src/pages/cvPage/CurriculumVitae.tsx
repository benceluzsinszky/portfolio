import { Helmet } from "react-helmet-async";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import CV from "../../assets/cv.pdf";
import ogImage from "../../assets/og_image.png";

export default function CurriculumVitae() {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  return (
    <div className="flex items-center">
      <Helmet>
        <title>Curriculum Vitae - Bence Luzsinszky</title>
        <meta
          name="description"
          content="Welcome to my portfolio. Full Stack Developer with a background in Electrical Engineering."
        />
        <meta
          name="keywords"
          content="Bence, Luzsisnzky, benceluzsisnzky, Portfolio, Full Stack Developer, Electrical Engineering, Software Design, ITU, React, Tailwind CSS, Vercel, FastAPI, DigitalOcean, PostgreSQL"
        />
        <meta
          property="og:title"
          content="Curriculum Vitae - Bence Luzsinszky"
        />
        <meta
          property="og:description"
          content="Welcome to my portfolio. Full Stack Developer with a background in Electrical Engineering."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://benceluzsinszky.com" />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Curriculum Vitae - Bence Luzsisnzky"
        />
        <meta
          name="twitter:description"
          content="Welcome to my portfolio. Full Stack Developer with a background in Electrical Engineering."
        />
        <meta name="twitter:image" content={ogImage} />
        <meta name="author" content="Bence Luzsisnzky" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Document file={CV} className="space-y-2">
        <Page pageNumber={1} scale={2} />
        <Page pageNumber={2} scale={2} />
      </Document>
    </div>
  );
}
