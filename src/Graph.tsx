import React from "react";

const Graph: React.FunctionComponent = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = React.useState(false);
  const [coordinateX, setCoordinateX] = React.useState(0);
  const [coordinateY, setCoordinateY] = React.useState(0);
  const getContext = (): CanvasRenderingContext2D | null => {
    const canvas = canvasRef.current;
    return canvas !== null ? canvas.getContext("2d") : null;
  };
  const startDrawing = (x: number, y: number): void => {
    setDrawing(true);
    const ctx = getContext();
    if (ctx !== null) ctx.moveTo(x, y);
  };
  const setCoordinate = (x: number, y: number): void => {
    setCoordinateX(x);
    setCoordinateY(y);
  };
  const mouseMove = (x: number, y: number): void => {
    if (drawing) setCoordinate(x, y);
  };
  const endDrawing = (): void => {
    setDrawing(false);
  };
  React.useEffect(() => {
    const ctx = getContext();
    if (ctx !== null) {
      ctx.strokeStyle = "white";
      ctx.lineTo(coordinateX, coordinateY);
      ctx.stroke();
    }
  }, [coordinateX, coordinateY]);
  return (
    <div>
      <canvas
        className="canvas"
        ref={canvasRef}
        width="400px"
        height="400px"
        onMouseDown={(e): void =>
          startDrawing(e.nativeEvent.offsetX, e.nativeEvent.y)
        }
        onMouseMove={(e): void =>
          mouseMove(e.nativeEvent.offsetX, e.nativeEvent.y)
        }
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
      />
    </div>
  );
};

export default Graph;
