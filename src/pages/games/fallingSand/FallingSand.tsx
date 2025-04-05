import { useEffect, useRef } from "react";

export default function FallingSand() {
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const context = canvas.getContext("2d");
    if (!context) return;
    context.imageSmoothingEnabled = false;

    const grid = gridRef.current;
    if (!grid) return;

    const choseSandColor = () => {
      const colors = [
        "rgb(246,215,176)",
        "rgb(242,210,169)",
        "rgb(236,204,162)",
        "rgb(231,196,150)",
        "rgb(225,191,146)",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
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

      <div>
        <h2>Descirption</h2>
        <button
          onClick={() => {
            clearGrid();
          }}
          className="bg-slate-50 text-black rounded-md p-2 m-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
