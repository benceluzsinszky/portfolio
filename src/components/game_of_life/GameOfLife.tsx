import { useEffect, useReducer, useState } from 'react';
import '../../styles/game_of_life/GameOfLife.css';
import GameGrid from './GameGrid';

export interface State {
  size: number;
  speed: number;
  generation: number;
  isRunning: boolean;
  gridArray: number[];
}  

export type Action =
  | { type: 'SET_SIZE'; size: number }
  | { type: 'SET_SPEED'; speed: number }
  | { type: 'INCREASE_GENERATION' }
  | { type: 'RESET_GENERATION' }
  | { type: 'START_RUNNING' }
  | { type: 'STOP_RUNNING' }
  | { type: 'SET_GRID'; gridArray: number[] };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_SIZE':
      return { ...state, size: action.size };
    case 'SET_SPEED':
      return { ...state, speed: action.speed };
    case 'INCREASE_GENERATION':
      return { ...state, generation: state.generation + 1 };
    case 'RESET_GENERATION':
      return { ...state, generation: 0 };
    case 'START_RUNNING':
      return { ...state, isRunning: true };
    case 'STOP_RUNNING':
      return { ...state, isRunning: false };
    case 'SET_GRID':
      return { ...state, gridArray: action.gridArray };
    default:
      return state;
  }
};

export default function App() {

  const [state, dispatch] = useReducer(reducer, {
    size: 10,
    speed: 5,
    generation: 0,
    isRunning: false,
    gridArray: Array(10 * 10).fill(0),
  }
  );

  const [sliderSize, setSliderSize] = useState(10);
  const [sliderSpeed, setSliderSpeed] = useState(5);

  const [aliveCells, setAliveCells] = useState(0);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderSize(Number(event.target.value));
    dispatch({ type: 'SET_SIZE', size: parseInt(event.target.value) });
    if (aliveCells > 0) {
      handleClear();
    }
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderSpeed(Number(event.target.value));
    dispatch({ type: 'SET_SPEED', speed: parseInt(event.target.value) });
  };

  const handleStart = () => {
    dispatch({ type: 'START_RUNNING' });
    dispatch({ type: 'RESET_GENERATION' });
  };

  const handleRandomize = () => {
    dispatch({ type: 'STOP_RUNNING' });
    const randomArray = [];
    for (let i = 0; i < state.size * state.size; i++) {
      randomArray.push(Math.random() < 0.2 ? 1 : 0);
    }
    dispatch({ type: 'SET_GRID', gridArray: randomArray });

    gridArrayToCss(randomArray);
  };

  const handleClear = () => {
    dispatch({ type: 'STOP_RUNNING' });
    dispatch({ type: 'RESET_GENERATION' });
    dispatch({ type: 'SET_GRID', gridArray: state.gridArray.fill(0) });
    setAliveCells(0);
    gridArrayToCss(state.gridArray);
  };

  const gridArrayToCss = (gridArray: number[]) => {
    for (let i = 0; i < gridArray.length; i++) {
      const cell = document.getElementById(`cell-${i}`);
      if (!cell) {
        continue;
      }
      if (gridArray[i] === 1) {
        cell.className = 'game-cell alive';
      } else {
        cell.className = 'game-cell dead';
      }
    }
  };

  useEffect(() => {
    const sumGridArray = state.gridArray.reduce((a: number, b: number) => a + b, 0);
    setAliveCells(sumGridArray);
  }, [state.gridArray]);

  return (
    <>
      <h1>Conway&apos;s Game of Life</h1>
      <div className='info'>
        <div className='info-text'>
          <p>Generation:</p><p>{state.generation}</p>
        </div>
        <div className='info-text'>
          <p>Alive Cells:</p><p>{aliveCells}</p>
        </div>
      </div>
      <GameGrid
        state={state}
        dispatch={dispatch}
        gridArrayToCss={gridArrayToCss} />
      <div className='sliders'>
        <div className='info-text'>
          <p>Grid Size:</p><p>{state.size}</p>
        </div>
        <input
          type="range"
          min="5"
          max="50"
          step={0.01}
          value={sliderSize}
          onChange={handleSizeChange}
        />
        <div className='info-text'>
          <p>Speed:</p><p>{state.speed}</p>
        </div>
        <input
          type='range'
          min='1'
          max='10'
          step={0.01}
          value={sliderSpeed}
          onChange={handleSpeedChange}
        />
      </div>
      <div className='buttons'>
        <button onClick={handleStart}>Start</button>
        <button onClick={() => dispatch({ type: "STOP_RUNNING" })}>Stop</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleRandomize}>Random</button>
      </div>
    </>
  );
};