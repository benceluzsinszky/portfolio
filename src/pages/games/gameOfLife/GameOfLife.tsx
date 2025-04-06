import { useEffect, useRef, useState } from "react";

import { Button, Slider, Space } from "@mantine/core";

type HslColor = {
  h: number;
  s: number;
  l: number;
};

export default function GameOfLife() {
  const [isRunning, setIsRunning] = useState(false);

  const [resolution, setResolution] = useState(32);

  const handleResolutionChange = (value: number) => {
    const valueMap: { [key: number]: number } = {
      1: 16,
      2: 32,
      3: 64,
      4: 128,
      5: 256,
      6: 512,
      7: 1024,
    };
    clearGrid();
    setResolution(valueMap[value]);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const canvasSize = Math.floor(window.innerWidth / 3);
  const pixelSize = canvasSize / resolution;

  const gridRef = useRef<string[][]>(
    Array.from({ length: resolution }, () => Array(resolution).fill(""))
  );

  const clearGrid = () => {
    setIsRunning(false);
    for (let y = 0; y < resolution; y++) {
      for (let x = 0; x < resolution; x++) {
        gridRef.current[y][x] = "";
      }
    }
  };

  const generateRandomGrid = () => {
    setIsRunning(false);
    for (let y = 0; y < resolution; y++) {
      for (let x = 0; x < resolution; x++) {
        gridRef.current[y][x] =
          Math.random() < 0.85 ? "" : "hsl(100, 100%, 100%)";
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    gridRef.current = Array.from({ length: resolution }, () =>
      Array(resolution).fill("")
    );
  }, [resolution]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const context = canvas.getContext("2d");
    if (!context) return;
    context.imageSmoothingEnabled = false;

    const grid = gridRef.current;
    if (!grid) return;

    const parseHsl = (color: string): HslColor => {
      const match = color.match(
        /hsl\(\s*(-?\d+)\s*,\s*(-?\d+)%\s*,\s*(-?\d+)%\s*\)/
      );

      if (!match) return { h: 32, s: 74, l: 80 };

      const [, h, s, l] = match;
      return {
        h: parseInt(h, 10),
        s: parseInt(s, 10),
        l: parseInt(l, 10),
      };
    };

    const parseColorString = (hslColor: HslColor): string => {
      return `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`;
    };

    const addPixelAtMouse = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / pixelSize);
      const y = Math.floor((event.clientY - rect.top) / pixelSize);

      if (x >= 0 && x < resolution && y >= 0 && y < resolution) {
        if (gridRef.current[y][x] === "") {
          gridRef.current[y][x] = "hsl(100, 100%, 100%)";
        } else {
          gridRef.current[y][x] = "";
        }
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (!isRunning) {
        addPixelAtMouse(event);
      }
    };

    const checkNeighbors = (x: number, y: number) => {
      let aliveNeighbors = 0;

      // check top row
      if (y > 0) {
        if (gridRef.current[y - 1][x] !== "") aliveNeighbors++;
        if (x > 0 && gridRef.current[y - 1][x - 1] !== "") aliveNeighbors++;
        if (x < resolution - 1 && gridRef.current[y - 1][x + 1] !== "")
          aliveNeighbors++;
      }

      // check middle row
      if (x > 0 && gridRef.current[y][x - 1] !== "") aliveNeighbors++;
      if (x < resolution - 1 && gridRef.current[y][x + 1] !== "")
        aliveNeighbors++;

      // check bottom row
      if (y < resolution - 1) {
        if (gridRef.current[y + 1][x] !== "") aliveNeighbors++;
        if (x > 0 && gridRef.current[y + 1][x - 1] !== "") aliveNeighbors++;
        if (x < resolution - 1 && gridRef.current[y + 1][x + 1] !== "")
          aliveNeighbors++;
      }

      return aliveNeighbors;
    };

    const gameLoop = () => {
      const newGrid = Array.from({ length: resolution }, () =>
        Array(resolution).fill("")
      );

      for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
          const aliveNeighbors = checkNeighbors(x, y);
          if (gridRef.current[y][x] !== "") {
            if (aliveNeighbors < 2 || aliveNeighbors > 3) {
              newGrid[y][x] = "";
            } else {
              newGrid[y][x] = gridRef.current[y][x];
            }
          } else if (aliveNeighbors === 3) {
            newGrid[y][x] = "hsl(100, 100%, 100%)";
          }
        }
      }

      gridRef.current = newGrid;
    };

    const render = () => {
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
          if (gridRef.current[y][x] !== "") {
            context.fillStyle = gridRef.current[y][x];

            context.fillRect(
              x * pixelSize,
              y * pixelSize,
              pixelSize,
              pixelSize
            );
          }
        }
      }

      if (isRunning) {
        gameLoop();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    canvas.addEventListener("mousedown", handleMouseDown);

    render();

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [resolution, window.innerWidth, isRunning]);

  return (
    <div>
      <h1 className="text-center mb-10">Conway's Game Of Life</h1>
      <div className="flex flex-col md:flex-row items-start justify-between h-full">
        <canvas ref={canvasRef} className="border border-slate-50"></canvas>
        <div className="w-1/3">
          <h3 className="mt-0">Descirption</h3>
          <p>
            The Game of Life is a cellular automaton devised by the British
            mathematician John Horton Conway in 1970. It is a zero-player game,
            meaning that its evolution is determined by its initial state., with
            no further input from humans. One interacts with the Game of Life by
            creating an initial configuration and observing how it evolves.
          </p>
          <Space h="lg" />
          <h3>Grid Resolution</h3>
          <Slider
            defaultValue={3}
            color="grey"
            step={1}
            showLabelOnHover={false}
            onChange={(value) => handleResolutionChange(value)}
            max={7}
            min={1}
            marks={[
              { value: 1, label: "16" },
              { value: 2, label: "32" },
              { value: 3, label: "64" },
              { value: 4, label: "128" },
              { value: 5, label: "256" },
              { value: 6, label: "512" },
              { value: 7, label: "1024" },
            ]}
          />

          <div className="flex flex-col mt-10">
            <div className="flex flex-row justify-evenly items-center">
              <Button
                color="white"
                variant="outline"
                onClick={() => setIsRunning(true)}
              >
                Start
              </Button>
              <Button
                color="white"
                variant="outline"
                onClick={() => setIsRunning(false)}
              >
                Stop
              </Button>
              <Button
                color="white"
                variant="outline"
                onClick={() => {
                  clearGrid();
                }}
              >
                Clear
              </Button>
            </div>
            <div className="flex flex-row justify-evenly items-center mt-5">
              <Button
                color="white"
                variant="outline"
                onClick={generateRandomGrid}
              >
                Random
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
