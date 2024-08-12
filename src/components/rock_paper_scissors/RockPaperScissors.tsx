import { useState } from "react";
import { Button, Slider } from "../../interfaces/interfaces";
import Buttons from "../common/game_frame/Buttons";
import "../common/game_frame/GameFrame.css";
import InfoBox from "../common/game_frame/InfoBox";
import Sliders from "../common/game_frame/Sliders";
import Simulation from "./Simulation";

export default function RockPaperScissors() {
  const [isRunning, setIsRunning] = useState(false);
  const [size, setSize] = useState(10);
  const [sliderSize, setSliderSize] = useState(10);
  const [speed, setSpeed] = useState(5);
  const [sliderSpeed, setSliderSpeed] = useState(5);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderSize(Number(event.target.value));
    setSize(parseInt(event.target.value));
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderSpeed(Number(event.target.value));
    setSpeed(parseInt(event.target.value));
  };

  const createSliders = (): Array<Slider> => {
    return [
      {
        infoText: {
          name: "Group size :",
          value: size,
        },
        min: 5,
        max: 50,
        value: sliderSize,
        onChange: handleSizeChange,
      },
      {
        infoText: {
          name: "Speed :",
          value: speed,
        },
        min: 1,
        max: 10,
        value: sliderSpeed,
        onChange: handleSpeedChange,
      },
    ];
  };

  const createButtons = (): Array<Button> => {
    return [
      {
        text: "Start",
        onClick: () => setIsRunning(true),
      },
      {
        text: "Stop",
        onClick: () => setIsRunning(false),
      },
    ];
  };

  return (
    <div className="panels">
      <div className="left-panel" />
      <div className="middle-panel">
        <h1 className="game-title">Rock, Paper, Scissors</h1>
        <InfoBox
          infoTexts={[
            { name: "Rocks alive", value: 0 },
            { name: "Papers alive", value: 0 },
            { name: "Scissors alive", value: 0 },
          ]}
        />
        <div className="game-div">
          <Simulation />
        </div>
        <div className="controls">
          <Sliders sliders={createSliders()} />
          <Buttons buttons={createButtons()} />
        </div>
      </div>
      <div className="right-panel">
        <h2>Description:</h2>
        <p>
          An automatic Rock, Paper, Scissors Simulation. Adjust speed and number
          of sprites with sliders.
        </p>
      </div>
    </div>
  );
}
