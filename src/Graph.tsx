import React from "react";
//import {  newNote, noteColor, noteNumber } from "./lib";

type Props = {
  graph: Graph;
  setPoints: SetPointsFunc;
  notes: Note[];
  setNotes: SetNotesFunc;
  bindingTarget: BindingTarget;
  setBindingTarget: SetBindingTargetFunc;
};

function funcToCanvas(canvas: HTMLCanvasElement, p: Point): Point {
  const x = (p.x / 100) * canvas.width;
  const y = (1 - p.y / 100) * canvas.height;
  return { x: x, y: y };
}

function canvasToFunc(canvas: HTMLCanvasElement, p: Point): Point {
  const x = (p.x / canvas.width) * 100;
  const y = (-p.y / canvas.height + 1) * 100;
  return { x: x, y: y };
}

function drawGraph(
  canvas: HTMLCanvasElement,
  graph: Graph,
  prev: Graph | null,
  notes: Note[]
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  for (let i = 0; i + 1 < graph.points.length; i++) {
    ctx.beginPath();
    const x1 = graph.points[i].x;
    const d1 = graph.df(x1);
    const x4 = graph.points[i + 1].x;
    const d4 = graph.df(x4);
    const x2 = (2 * x1 + x4) / 3;
    const y2 = graph.points[i].y + (d1 !== null ? d1 : 0) * (x2 - x1);
    const x3 = (x1 + 2 * x4) / 3;
    const y3 = graph.points[i + 1].y - (d4 !== null ? d4 : 0) * (x4 - x3);
    const p1 = funcToCanvas(canvas, graph.points[i]);
    const p2 = funcToCanvas(canvas, { x: x2, y: y2 });
    const p3 = funcToCanvas(canvas, { x: x3, y: y3 });
    const p4 = funcToCanvas(canvas, graph.points[i + 1]);
    ctx.moveTo(p1.x, p1.y);
    ctx.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
    ctx.stroke();
  }
}

const Graph: React.FunctionComponent<Props> = props => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = React.useState(false);

  //const [coordinateX, setCoordinateX] = React.useState(0);
  //const [coordinateY, setCoordinateY] = React.useState(0);
  //const [oldPoints, setOldPoints] = React.useState<Graph | null>(null);
  //const oldGraphCurve =
  /*
  const getContext = (): CanvasRenderingContext2D | null => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext("2d") : null;
  };
  */
  /*
  const startDrawing = (x: number, y: number): void => {
    setDrawing(true);
    //const ctx = getContext();
    //f (ctx) ctx.moveTo(x, y);
  };*/
  /*
  const setCoordinate = (x: number, y: number): void => {
    setCoordinateX(x);
    setCoordinateY(y);
  };*/
  const onClick = (e: React.MouseEvent<HTMLCanvasElement>): void => {};
  /*
  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    setDrawing(true);
    //startDrawing(e.clientX, e.clientY);
  }*/
  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return;
      const maxMarginLeft = 5;
      const maxDelta = 5;
      const p = canvasToFunc(canvasRef.current, {
        x: e.clientX,
        y: e.clientY
      });
      if (props.graph.end === null && p.x < maxMarginLeft) {
        setDrawing(true);
      } else if (
        props.graph.end !== null &&
        props.graph.end < p.x &&
        p.x - props.graph.end < maxDelta
      ) {
        setDrawing(true);
      }
    },
    [setDrawing, props]
  );
  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return;

      const maxMarginLeft = 5;
      const minDelta = 1;
      const p = canvasToFunc(canvasRef.current, {
        x: e.nativeEvent.offsetX,
        y: e.clientY
      });

      if (drawing) {
        if (props.graph.end === null && p.x < maxMarginLeft) {
          props.setPoints(prev => [...prev, p]);
        } else if (
          props.graph.end !== null &&
          p.x > props.graph.end &&
          p.x - props.graph.end > minDelta
        ) {
          props.setPoints(prev => [...prev, p]);
        }
      }
    },
    [props, drawing]
  );

  const onEndDrawing = React.useCallback(() => setDrawing(false), [setDrawing]);

  React.useEffect(() => {
    if (canvasRef.current) {
      drawGraph(canvasRef.current, props.graph, null, props.notes);
    }
  }, [props]);
  return (
    <div>
      <canvas
        width="1000px"
        height="500px"
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onEndDrawing}
        onMouseLeave={onEndDrawing}
      />
    </div>
  );
};

export default Graph;
