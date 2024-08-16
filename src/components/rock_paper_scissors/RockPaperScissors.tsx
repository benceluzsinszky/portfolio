import { useState } from "react";
import { Button, InfoText, Slider } from "../../interfaces/interfaces";
import Buttons from "../common/game_frame/Buttons";
import "../common/game_frame/GameFrame.css";
import InfoBox from "../common/game_frame/InfoBox";
import Sliders from "../common/game_frame/Sliders";
import { SpriteType } from "./Constants";
import "./RockPaperScissors.css";
import Simulation from "./Simulation";

export default function RockPaperScissors() {
  const [isRunning, setIsRunning] = useState(false);
  const [size, setSize] = useState(1);
  const [sliderSize, setSliderSize] = useState(10);
  const [speed, setSpeed] = useState(5);
  const [sliderSpeed, setSliderSpeed] = useState(5);

  const [spriteArray, setSpriteArray] = useState(new Array<SpriteType>());

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderSize(Number(event.target.value));
    setSize(parseInt(event.target.value));
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderSpeed(Number(event.target.value));
    setSpeed(parseInt(event.target.value));
  };

  const handleStart = () => {
    if (isRunning) return;
    generateSpriteArray();
    setIsRunning(true);
  };

  const createInfoBox = (): Array<InfoText> => {
    return [
      { name: "Rocks alive", value: 0 },
      { name: "Papers alive", value: 0 },
      { name: "Scissors alive", value: 0 },
    ];
  };

  const createSliders = (): Array<Slider> => {
    return [
      {
        infoText: {
          name: "Group size :",
          value: size,
        },
        min: 1,
        max: 10,
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
        onClick: handleStart,
      },
      {
        text: "Stop",
        onClick: () => setIsRunning(false),
      },
    ];
  };

  const generateSpriteArray = () => {
    const newSpriteArray = [];
    for (let i = 0; i < size; i++) {
      newSpriteArray.push(SpriteType.ROCK);
    }
    for (let i = 0; i < size; i++) {
      newSpriteArray.push(SpriteType.PAPER);
    }
    for (let i = 0; i < size; i++) {
      newSpriteArray.push(SpriteType.SCISSORS);
    }
    setSpriteArray(newSpriteArray);
  };

  return (
    <div className="panels">
      <div className="left-panel" />
      <div className="middle-panel">
        <h1 className="game-title">Rock, Paper, Scissors</h1>
        <InfoBox infoTexts={createInfoBox()} />
        <div className="game-div">
          <Simulation
            isRunning={isRunning}
            spriteArray={spriteArray}
            groupSize={size}
          />
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
