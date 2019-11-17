import React from "react";
import { newNote, noteColor, noteNumber } from "./lib";

type Props = {
  graph: Graph;
  setPoints: SetPointsFunc;
  notes: Note[];
  setNotes: SetNotesFunc;
  bindingTarget: BindingTarget;
  setBindingTarget: SetBindingTargetFunc;
};

const scaleX = 100;
const scaleY = 100;

function funcToCanvas(canvas: HTMLCanvasElement, p: Point): Point {
  const x = (p.x / scaleX) * canvas.width;
  const y = (1 - p.y / scaleY) * canvas.height;
  return { x: x, y: y };
}

function canvasToFunc(e: React.MouseEvent<HTMLCanvasElement>): Point {
  const bounds = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - bounds.left) / (bounds.right - bounds.left);
  const y = (e.clientY - bounds.top) / (bounds.bottom - bounds.top);
  return { x: x * scaleX, y: (-y + 1) * scaleY };
}

function drawGraph(
  canvas: HTMLCanvasElement,
  graph: Graph,
  prev: Graph | null,
  notes: Note[]
): void {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    if (prev) {
      ctx.strokeStyle = "gray";
      for (let i = 0; i + 1 < prev.points.length; i++) {
        ctx.beginPath();
        const x1 = prev.points[i].x;
        const d1 = prev.df(x1);
        const x4 = prev.points[i + 1].x;
        const d4 = prev.df(x4);
        const x2 = (2 * x1 + x4) / 3;
        const y2 = prev.points[i].y + (d1 !== null ? d1 : 0) * (x2 - x1);
        const x3 = (x1 + 2 * x4) / 3;
        const y3 = prev.points[i + 1].y - (d4 !== null ? d4 : 0) * (x4 - x3);
        const p1 = funcToCanvas(canvas, prev.points[i]);
        const p2 = funcToCanvas(canvas, { x: x2, y: y2 });
        const p3 = funcToCanvas(canvas, { x: x3, y: y3 });
        const p4 = funcToCanvas(canvas, prev.points[i + 1]);
        ctx.moveTo(p1.x, p1.y);
        ctx.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
        ctx.stroke();
      }
    }
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
    for (let i = 0; i < notes.length; i++) {
      const x = notes[i].x;
      if (x !== null) {
        if (
          graph.start !== null &&
          graph.end !== null &&
          graph.start <= x &&
          x <= graph.end
        ) {
          const y = graph.f(x);
          const y2 = graph.d2f(x);
          const n = noteNumber(notes, notes[i].id);
          const color = noteColor(notes[i].id);
          if (y !== null && y2 !== null && n !== null) {
            const p = funcToCanvas(canvas, { x: x, y: y });
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.textAlign = "center";
            ctx.fillText(n.toString(), p.x, p.y + 10 * (y2 > 0 ? -1 : 1));
          }
        } else if (prev !== null) {
          if (
            prev.start !== null &&
            prev.end !== null &&
            prev.start <= x &&
            x <= prev.end
          ) {
            const y = prev.f(x);
            const y2 = prev.d2f(x);
            const n = noteNumber(notes, notes[i].id);
            if (y !== null && y2 !== null && n !== null) {
              const p = funcToCanvas(canvas, { x: x, y: y });
              ctx.fillStyle = "gray";
              ctx.beginPath();
              ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
              ctx.fill();
              ctx.textAlign = "center";

              ctx.fillText(n.toString(), p.x, p.y - 10 * (y2 > 0 ? -1 : 1));
            }
          }
        }
      }
    }
  }
}

const Graph: React.FunctionComponent<Props> = props => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = React.useState(false);
  const [oldGraph, setOldGraph] = React.useState<Graph | null>(null);
  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): void => {
      const p = canvasToFunc(e);
      if (props.graph.start !== null && props.graph.end !== null) {
        if (props.graph.start <= p.x && p.x < props.graph.end) {
          if (props.bindingTarget === null) {
            props.setNotes(prev => {
              const note = newNote(prev);
              note.x = p.x;
              const i = prev.findIndex(n => n.x !== null && n.x >= p.x);
              return i >= 0
                ? [...prev.slice(0, i), note, ...prev.slice(i, prev.length)]
                : [...prev, note];
            });
          } else {
            props.setNotes(prev =>
              prev.map(n =>
                n.id === props.bindingTarget ? { id: n.id, x: p.x } : n
              )
            );
          }
        }
      }
    },
    [props]
  );
  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return;
      const maxMarginLeft = 5;
      const maxDelta = 5;
      const p = canvasToFunc(e);
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
      const p = canvasToFunc(e);

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
  const clear = React.useCallback(() => {
    setOldGraph(props.graph);
    props.setPoints([]);
  }, [props]);
  React.useEffect(() => {
    if (canvasRef.current) {
      drawGraph(canvasRef.current, props.graph, oldGraph, props.notes);
    }
  }, [oldGraph, props]);
  return (
    <div>
      <canvas
        width="1000px"
        height="500px"
        ref={canvasRef}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onEndDrawing}
        onMouseLeave={onEndDrawing}
      />
      <div onClick={clear}>Clear</div>
    </div>
  );
};

export default Graph;
