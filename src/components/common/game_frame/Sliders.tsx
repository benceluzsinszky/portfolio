import { Slider } from "../../../interfaces/interfaces";

interface SlidersProps {
  sliders: Array<Slider>;
}

export default function Sliders({ sliders }: SlidersProps) {
  return (
    <div className="sliders">
      {sliders.map((slider, index) => (
        <div key={index}>
          <div className="info-text">
            <p>{slider.infoText.name}</p>
            <p>{slider.infoText.value}</p>
          </div>
          <input
            type="range"
            min={slider.min}
            max={slider.max}
            step={0.01}
            value={slider.value}
            onChange={slider.onChange}
          />
        </div>
      ))}
    </div>
  );
}
