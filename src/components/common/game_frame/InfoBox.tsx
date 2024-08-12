import { InfoText } from "../../../interfaces/interfaces";

import "./InfoBox.css";

interface InfoBoxProps {
  infoTexts: Array<InfoText>;
}

export default function InfoBox({ infoTexts }: InfoBoxProps) {
  return (
    <div className="info">
      {infoTexts.map((info, index) => (
        <div className="info-text" key={index}>
          <p>{info.name}</p>
          <p>{info.value}</p>
        </div>
      ))}
    </div>
  );
}
