import React from "react";

type Props = {
  points: Point[];
  setPoints: SetPointsFunc;
  graphCurve: GraphFunction;
  setNotes: SetNotesFunc;
  bindingTarget: BindingTarget;
  setBindingTarget: SetBindingTargetFunc;
};

function bezierPoints() {}

const Graph: React.FunctionComponent<Props> = props => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = React.useState(false);
  const [coordinateX, setCoordinateX] = React.useState(0);
  const [coordinateY, setCoordinateY] = React.useState(0);

  const [oldPoints, setOldPoints] = React.useState<Point[]>([]);
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
