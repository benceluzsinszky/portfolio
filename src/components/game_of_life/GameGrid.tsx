import { useCallback, useEffect } from "react";
import "./GameGrid.css";

import { Action } from "../../interfaces/interfaces";
import { ActionType } from "./Constants";
import { State } from "./GameOfLife";

interface GameGridProps {
  state: State;
  dispatch: React.Dispatch<Action<ActionType>>;
  size: number;
  speed: number;
  gridArray: number[];
  setGridArray: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function GameGrid({
  state,
  dispatch,
  size,
  speed,
  gridArray,
  setGridArray,
}: GameGridProps) {
  const isRunning = state.isRunning;

  const createGrid = (size: number) => {
    const cellSize = screen.height / 3 / size;

    const rows = [];
    for (let i = 0; i < size; i++) {
      const cells = [];
      for (let j = 0; j < size; j++) {
        const index = i * size + j;
        cells.push(
          <td
            key={index}
            className={`game-cell dead`}
            id={`cell-${index}`}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
            }}
            onClick={handleClickedCell}
          ></td>
        );
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    return (
      <table className="game-grid">
        <tbody>{rows}</tbody>
      </table>
    );
  };

  const handleClickedCell = (event: React.MouseEvent<HTMLTableCellElement>) => {
    const newGridArray = [...gridArray];
    const cellIndex: number = parseInt(event.currentTarget.id.split("-")[1]);

    if (gridArray[cellIndex] === 1) {
      newGridArray[cellIndex] = 0;
    } else {
      newGridArray[cellIndex] = 1;
    }

    setGridArray(newGridArray);
  };

  const getNumberOfNeighbors = useCallback(
    (cellIndex: number) => {
      let neighbors = 0;

      // check top row
      for (let i = cellIndex - size - 1; i <= cellIndex - size + 1; i++) {
        if (i < 0) {
          continue;
        }
        const cell = gridArray[i];
        if (cell && cell === 1) {
          neighbors++;
        }
      }
      // check left
      if (cellIndex % size !== 0) {
        const previousCell = gridArray[cellIndex - 1];
        if (previousCell && gridArray[cellIndex - 1] === 1) {
          neighbors++;
        }
      }

      // check right
      if (cellIndex % size !== size - 1) {
        const nextCell = gridArray[cellIndex + 1];
        if (nextCell && gridArray[cellIndex + 1] === 1) {
          neighbors++;
        }
      }

      // check bottom row
      for (let i = cellIndex + size - 1; i <= cellIndex + size + 1; i++) {
        if (i > size * size) {
          continue;
        }
        const cell = gridArray[i];
        if (cell && cell === 1) {
          neighbors++;
        }
      }
      return neighbors;
    },
    [gridArray, size]
  );

  const gameLoop = useCallback(() => {
    if (!isRunning) {
      return;
    }

    dispatch({ type: ActionType.INCREASE_GENERATION });

    const cellsNumber = size * size;

    const newGridArray = [...gridArray];

    for (let i = 0; i < cellsNumber; i++) {
      const cell = gridArray[i];
      const neighbors = getNumberOfNeighbors(i);

      if (cell === 1) {
        if (neighbors < 2 || neighbors > 3) {
          newGridArray[i] = 0;
        }
      } else {
        if (neighbors === 3) {
          newGridArray[i] = 1;
        }
      }
    }

    const arraysAreEqual =
      gridArray.length === newGridArray.length &&
      gridArray.every(
        (value: number, index: number) => value === newGridArray[index]
      );

    setGridArray(newGridArray);

    const aliveCellsAtEnd = newGridArray.reduce(
      (a: number, b: number) => a + b,
      0
    );

    if (aliveCellsAtEnd === 0 || arraysAreEqual) {
      dispatch({ type: ActionType.STOP });
    }
  }, [
    gridArray,
    setGridArray,
    isRunning,
    size,
    getNumberOfNeighbors,
    dispatch,
  ]);

  const calculateGameSpeed = useCallback(() => {
    return (200 / speed) * 2;
  }, [speed]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const timer = setTimeout(() => {
      gameLoop();
    }, calculateGameSpeed());

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timer);
  }, [isRunning, gameLoop, calculateGameSpeed]);

  return <div className="game-div">{createGrid(size)}</div>;
}
