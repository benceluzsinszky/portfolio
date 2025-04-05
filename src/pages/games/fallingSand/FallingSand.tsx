import { useEffect, useRef, useState } from "react";

import { ColorPicker } from "@mantine/core";

type HslColor = {
  h: number;
  s: number;
  l: number;
};

export default function FallingSand() {
  const [shaderEnabled, setShaderEnabled] = useState(false);
  const shaderEnabledRef = useRef(shaderEnabled);

  const [color, setColor] = useState("hsl(32,74%,80%)");
  const changeColorRef = useRef(color);

  const changeColor = (color: string) => {
    console.log(color);
    setColor(color);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const resolution = 32;
  const pixelSize = Math.floor(window.innerWidth / 3 / resolution);
  const canvasSize = pixelSize * resolution;

  const gridRef = useRef<string[][]>(
    Array.from({ length: resolution }, () => Array(resolution).fill(""))
  );

  const mouseDownRef = useRef(false);

  const clearGrid = () => {
    for (let y = 0; y < resolution; y++) {
      for (let x = 0; x < resolution; x++) {
        gridRef.current[y][x] = "";
      }
    }
  };

  useEffect(() => {
    shaderEnabledRef.current = shaderEnabled;
    changeColorRef.current = color;
  }, [shaderEnabled, color]);

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
      const match = color.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);

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

    const choseSandColor = () => {
      const hslColor = parseHsl(changeColorRef.current);
      console.log(hslColor);
      hslColor.l = Math.floor(Math.random() * 11) + (hslColor.l - 5);
      return parseColorString(hslColor);
    };

    const applyShader = (x: number, y: number) => {
      const color = gridRef.current[y][x];
      const hslColor = parseHsl(color);
      if (!hslColor) return color;

      let depth = 0;
      for (let i = y; i > 0; i--) {
        if (gridRef.current[i][x] !== "") {
          depth++;
        } else {
          break;
        }
      }
      if (depth > 0) {
        hslColor.l = Math.max(5, hslColor.l - depth * 5);
        const newColor = parseColorString(hslColor);
        return newColor;
      }
      return color;
    };

    const addSandAtMouse = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / pixelSize);
      const y = Math.floor((event.clientY - rect.top) / pixelSize);

      if (x >= 0 && x < resolution && y >= 0 && y < resolution) {
        if (gridRef.current[y][x] === "") {
          gridRef.current[y][x] = choseSandColor();
        }
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      mouseDownRef.current = true;
      addSandAtMouse(event);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (mouseDownRef.current) {
        addSandAtMouse(event);
      }
    };

    const handleMouseUp = () => {
      mouseDownRef.current = false;
    };

    const gravity = () => {
      const newGrid = gridRef.current.map((row) => [...row]);

      for (let y = resolution - 2; y >= 0; y--) {
        for (let x = 0; x < resolution; x++) {
          if (gridRef.current[y][x] !== "") {
            const color = gridRef.current[y][x];
            // Move down if possible
            if (gridRef.current[y + 1][x] === "") {
              newGrid[y][x] = "";
              newGrid[y + 1][x] = color;
              // Move diagonally if possible
            } else if (gridRef.current[y + 1][x] !== "") {
              const direction = Math.random() < 0.5 ? -1 : 1;
              if (
                x + direction >= 0 &&
                x + direction < resolution &&
                gridRef.current[y + 1][x + direction] === ""
              ) {
                newGrid[y][x] = "";
                newGrid[y + 1][x + direction] = color;
              } else if (
                x - direction >= 0 &&
                x - direction < resolution &&
                gridRef.current[y + 1][x - direction] === ""
              ) {
                newGrid[y][x] = "";
                newGrid[y + 1][x - direction] = color;
              }
            }
          }
        }
      }

      gridRef.current = newGrid;
    };

    const updateGrid = () => {
      gravity();
    };

    const render = () => {
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
          if (gridRef.current[y][x] !== "") {
            if (shaderEnabledRef.current) {
              context.fillStyle = applyShader(x, y);
            } else {
              context.fillStyle = gridRef.current[y][x];
            }
            context.fillRect(
              x * pixelSize,
              y * pixelSize,
              pixelSize,
              pixelSize
            );
          }
        }
      }

      updateGrid();

      animationFrameId.current = requestAnimationFrame(render);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    render();

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-row justify-between h-full">
      <canvas ref={canvasRef} className="border border-slate-50"></canvas>

      <div className="w-1/3">
        <h2>Descirption</h2>
        <p>
          This is a simple falling sand simulation. You can add sand by clicking
          on the canvas. The sand will fall down and spread out naturally.
        </p>
        <button
          onClick={() => {
            clearGrid();
          }}
          className="bg-slate-50 text-black rounded-md p-2 m-2"
        >
          Clear
        </button>
        <button
          onClick={() => {
            setShaderEnabled(!shaderEnabled);
          }}
          className="bg-slate-50 text-black rounded-md p-2 m-2"
        >
          {shaderEnabled ? "Remove" : "Apply"} Shader
        </button>
        <ColorPicker
          format="hsl"
          value={color}
          onChange={changeColor}
          swatches={[
            "hsl(0, 0%, 18%)",
            "hsl(210, 6%, 56%)",
            "hsl(0, 95%, 64%)",
            "hsl(336, 76%, 59%)",
            "hsl(286, 65%, 58%)",
            "hsl(250, 84%, 63%)",
            "hsl(228, 89%, 63%)",
            "hsl(210, 78%, 52%)",
            "hsl(189, 80%, 43%)",
            "hsl(163, 82%, 40%)",
            "hsl(137, 54%, 51%)",
            "hsl(83, 73%, 45%)",
            "hsl(40, 97%, 50%)",
            "hsl(26, 98%, 54%)",
          ]}
        />
      </div>
    </div>
  );
}
