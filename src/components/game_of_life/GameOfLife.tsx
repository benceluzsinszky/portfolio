import { useEffect, useReducer, useState } from "react";
import { Action, Button, InfoText, Slider } from "../../interfaces/interfaces";
import Buttons from "../common/game_frame/Buttons";
import "../common/game_frame/GameFrame.css";
import InfoBox from "../common/game_frame/InfoBox";
import Sliders from "../common/game_frame/Sliders";
import { ActionType } from "./Constants";
import GameGrid from "./GameGrid";

export interface State {
  generation: number;
  isRunning: boolean;
}

const reducer = (state: State, action: Action<ActionType>) => {
  switch (action.type) {
    case ActionType.INCREASE_GENERATION:
      return { ...state, generation: state.generation + 1 };
    case ActionType.RESET_GENERATION:
      return { ...state, generation: 0 };
    case ActionType.START:
      return { ...state, isRunning: true };
    case ActionType.STOP:
      return { ...state, isRunning: false };
    default:
      return state;
  }
};

export default function GameOfLife() {
  const [state, dispatch] = useReducer(reducer, {
    generation: 0,
    isRunning: false,
  });

  const [size, setSize] = useState(10);
  const [sliderSize, setSliderSize] = useState(10);
  const [speed, setSpeed] = useState(5);
  const [sliderSpeed, setSliderSpeed] = useState(5);
  const [grid, setGrid] = useState(Array(10 * 10).fill(0));

  const [aliveCells, setAliveCells] = useState(0);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderSize(Number(event.target.value));
    setSize(parseInt(event.target.value));
    if (aliveCells > 0) {
      handleClear();
    }
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderSpeed(Number(event.target.value));
    setSpeed(parseInt(event.target.value));
  };

  const handleStart = () => {
    dispatch({ type: ActionType.START });
    dispatch({ type: ActionType.RESET_GENERATION });
  };

  const handleRandomize = () => {
    dispatch({ type: ActionType.STOP });
    const randomArray = [];
    for (let i = 0; i < size * size; i++) {
      randomArray.push(Math.random() < 0.2 ? 1 : 0);
    }
    setGrid(randomArray);
  };

  const handleClear = () => {
    dispatch({ type: ActionType.STOP });
    dispatch({ type: ActionType.RESET_GENERATION });
    setAliveCells(0);
    setGrid(Array(size * size).fill(0));
  };

  const gridArrayToCss = (gridArray: number[]) => {
    for (let i = 0; i < gridArray.length; i++) {
      const cell = document.getElementById(`cell-${i}`);
      if (!cell) {
        continue;
      }
      if (gridArray[i] === 1) {
        cell.className = "game-cell alive";
      } else {
        cell.className = "game-cell dead";
      }
    }
  };

  const createInfoBox = (): Array<InfoText> => {
    return [
      { name: "Generations :", value: state.generation },
      { name: "Alive cells:", value: aliveCells },
    ];
  };

  const createSliders = (): Array<Slider> => {
    return [
      {
        infoText: {
          name: "Grid Size :",
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
        onClick: handleStart,
      },
      {
        text: "Stop",
        onClick: () => dispatch({ type: ActionType.STOP }),
      },
      {
        text: "Clear",
        onClick: handleClear,
      },
      {
        text: "Random",
        onClick: handleRandomize,
      },
    ];
  };

  useEffect(() => {
    const sumGridArray = grid.reduce((a: number, b: number) => a + b, 0);
    setAliveCells(sumGridArray);
    gridArrayToCss(grid);
  }, [grid]);

  return (
    <div className="panels">
      <div className="left-panel" />
      <div className="middle-panel">
        <h1>Conway&apos;s Game of Life</h1>
        <InfoBox infoTexts={createInfoBox()} />
        <GameGrid
          state={state}
          dispatch={dispatch}
          size={size}
          speed={speed}
          gridArray={grid}
          setGridArray={setGrid}
        />
        <Sliders sliders={createSliders()} />
        <Buttons buttons={createButtons()} />
      </div>
      <div className="right-panel">
        <h2>Description:</h2>
        <p>
          The Game of Life is a cellular automaton devised by the British
          mathematician John Horton Conway in 1970. It is a zero-player game,
          meaning that its evolution is determined by its initial state,
          requiring no further input.
        </p>
        <h2>Rules:</h2>
        <p>
          1. Any live cell with fewer than two live neighbors dies, as if by
          underpopulation.
        </p>
        <p>
          2. Any live cell with two or three live neighbors lives on to the next
          generation.
        </p>
        <p>
          3. Any live cell with more than three live neighbors dies, as if by
          overpopulation.
        </p>
        <p>
          4. Any dead cell with exactly three live neighbors becomes a live
          cell, as if by reproduction.
        </p>
      </div>
    </div>
  );
}
