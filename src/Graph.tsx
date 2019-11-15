import React from "react";
import { canvasToFunc, drawGraph } from "./lib";

type Props = {
  graph: Graph;
  setPoints: SetPointsFunc;
  notes: Note[];
  setNotes: SetNotesFunc;
  bindingTarget: BindingTarget;
  setBindingTarget: SetBindingTargetFunc;
};

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
        x: e.clientX,
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
        width="640px"
        height="480px"
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
