import React from "react";
import { drawGraph } from "./lib";

type Props = {
  graph: Graph;
  setPoints: SetPointsFunc;
  notes: Note[];
  setNotes: SetNotesFunc;
  bindingTarget: BindingTarget;
  setBindingTarget: SetBindingTargetFunc;
};

function bezierControlPoints(
  s: Point,
  e: Point,
  ds: number,
  de: number
): [Point, Point] {}

const Graph: React.FunctionComponent<Props> = props => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = React.useState(false);

  //const [coordinateX, setCoordinateX] = React.useState(0);
  //const [coordinateY, setCoordinateY] = React.useState(0);

  const [oldPoints, setOldPoints] = React.useState<Graph | null>(null);
  //const oldGraphCurve =

  const getContext = (): CanvasRenderingContext2D | null => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext("2d") : null;
  };
  const startDrawing = (x: number, y: number): void => {
    setDrawing(true);
    const ctx = getContext();
    if (ctx) ctx.moveTo(x, y);
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
  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    startDrawing(e.clientX, e.clientY);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    mouseMove(e.clientX, e.clientY);
  };
  React.useEffect(() => {
    drawGraph();
    const ctx = getContext();
    if (ctx !== null) {
      ctx.strokeStyle = "white";
      ctx.lineTo(coordinateX, coordinateY);
      ctx.stroke();
    }
  }, []);
  return (
    <div>
      <canvas
        width="640px"
        height="480px"
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
      />
    </div>
  );
};

export default Graph;
