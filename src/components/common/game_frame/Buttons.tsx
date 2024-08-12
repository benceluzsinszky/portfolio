import { Button } from "../../../interfaces/interfaces";

interface ButtonsProps {
  buttons: Array<Button>;
}

export default function Buttons({ buttons }: ButtonsProps) {
  return (
    <div className="buttons">
      {buttons.map((button, index) => (
        <button key={index} onClick={button.onClick}>
          {button.text}
        </button>
      ))}
    </div>
  );
}
