import { useReducer, useState } from "react";
import { Action, Button, InfoText, Slider } from "../../interfaces/interfaces";
import Buttons from "../common/game_frame/Buttons";
import "../common/game_frame/GameFrame.css";
import InfoBox from "../common/game_frame/InfoBox";
import Sliders from "../common/game_frame/Sliders";

interface State {
  info1: InfoText;
  info2: InfoText;
}

enum ActionType {
  SET_INFO1,
  SET_INFO2,
}

const reducer = (state: State, action: Action<ActionType>) => {
  switch (action.type) {
    case ActionType.SET_INFO1:
      return { ...state, info1: { ...state.info1, value: action.payload } };
    case ActionType.SET_INFO2:
      return { ...state, info2: { ...state.info2, value: action.payload } };
    default:
      return state;
  }
};

export default function Placeholder() {
  const [isRunning, setIsRunning] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    info1: { name: "Info 1", value: 1 },
    info2: { name: "Info 2", value: 5 },
  });

  const [sliderInfo1, setSliderInfo1] = useState(10);
  const [sliderInfo2, setSliderInfo2] = useState(5);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderInfo1(Number(event.target.value));
    dispatch({
      type: ActionType.SET_INFO1,
      payload: parseInt(event.target.value),
    });
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderInfo2(Number(event.target.value));
    dispatch({
      type: ActionType.SET_INFO2,
      payload: parseInt(event.target.value),
    });
  };

  const createSliders = (): Array<Slider> => {
    return [
      {
        infoText: state.info1,
        min: 5,
        max: 50,
        value: sliderInfo1,
        onChange: handleSizeChange,
      },
      {
        infoText: state.info2,
        min: 1,
        max: 10,
        value: sliderInfo2,
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
        <h1 className="game-title">Placeholder</h1>
        <InfoBox infoTexts={[state.info1, state.info2]} />
        <div className="game-div">
          <p>
            {isRunning ? "Placeholder is running" : "Placeholder is stopped"}
          </p>
        </div>
        <div className="controls">
          <Sliders sliders={createSliders()} />
          <Buttons buttons={createButtons()} />
        </div>
      </div>
      <div className="right-panel">
        <h2>Description:</h2>
        <p>This is a placeholder for future projects.</p>
      </div>
    </div>
  );
}
