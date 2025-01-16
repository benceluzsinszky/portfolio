import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import CV from "../../assets/cv.pdf";

export default function CurriculumVitae() {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  return (
    <div className="flex items-center">
      <Document file={CV} className="space-y-2">
        <Page pageNumber={1} scale={2} />
        <Page pageNumber={2} scale={2} />
      </Document>
    </div>
  );
}
