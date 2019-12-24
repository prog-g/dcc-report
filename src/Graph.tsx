import React from "react";
import { newNote, noteColor, noteNumber } from "./lib/note";

type Props = {
  graph: Graph;
  setPoints: SetPointsFunc;
  notes: Note[];
  setNotes: SetNotesFunc;
  bindingTarget: BindingTarget;
  setBindingTarget: SetBindingTargetFunc;
};

const scaleX = 100; // 関数空間の横の長さ
const scaleY = 100; // 関数空間の縦の長さ
const minDelta = 0.4; // 標本点の x の最小間隔
const maxResume = 2.5; // 描画再開とみなす標本点の x の最大距離
const maxMarginLeft = 5; // 定義域の始まりの上限
const width = 1200; // キャンバスの横の長さ
const height = 500; // キャンバスの縦の長さ
const graphLineWidth = 2; // グラフ曲線の描画幅
const graphPointRadius = 4; // グラフの点の半径
const graphFont = "sans-serif"; // グラフで使うフォント
const graphFontSize = 20; // グラフのフォントサイズ
const graphLineColor = "#000"; // グラフ曲線の描画色
const oldGraphLineWidth = 1.5; // 前回のグラフ曲線の描画幅
const oldGraphPointRadius = 3; // 前回のグラフの点の半径
const oldGraphFontSize = 16; // 前回グラフで使うフォント
const oldGraphLineColor = "#aaa"; // 前回グラフ曲線の描画色
const gridx = 10; // グリッドの x 分割数
const gridy = 4; // グリッドの y 分割数
const gridLineWidth = 1; // グリッド線の描画幅
const gridLineColor = "#777"; // グリッド線の描画色
const eps = 2 ** -52; // 開区間を評価するための十分小さい値

// 曲線関数空間からキャンバス空間への座標変換
function funcToCanvas(canvas: HTMLCanvasElement, p: Point): Point {
  const x = (p.x / scaleX) * canvas.width;
  const y = (1 - p.y / scaleY) * canvas.height;
  return { x: x, y: y };
}

// キャンバス空間から曲線関数空間への座標変換
function canvasToFunc(e: React.MouseEvent<HTMLCanvasElement>): Point {
  const bounds = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - bounds.left) / (bounds.right - bounds.left);
  const y = (e.clientY - bounds.top) / (bounds.bottom - bounds.top);
  return { x: x * scaleX, y: (-y + 1) * scaleY };
}

// キャンバスへの描画ルーチン
function drawGraph(
  canvas: HTMLCanvasElement,
  graph: Graph,
  prev: Graph,
  notes: Note[]
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // グリッドを描く
  ctx.lineWidth = gridLineWidth;
  ctx.strokeStyle = gridLineColor;
  for (let i = 0; i <= gridx; i++) {
    const p1 = funcToCanvas(canvas, { x: (i * scaleX) / gridx, y: 0 });
    const p2 = funcToCanvas(canvas, { x: (i * scaleX) / gridx, y: scaleY });
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
  for (let i = 0; i <= gridy; i++) {
    const p1 = funcToCanvas(canvas, { x: 0, y: (i * scaleY) / gridy });
    const p2 = funcToCanvas(canvas, { x: scaleX, y: (i * scaleY) / gridy });
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
  // 前回のグラフを描く
  if (prev) {
    ctx.lineWidth = oldGraphLineWidth;
    ctx.strokeStyle = oldGraphLineColor;
    for (let i = 0; i + 1 < prev.points.length; i++) {
      ctx.beginPath();
      const x1 = prev.points[i].x;
      const y1 = prev.points[i].y;
      const d1 = prev.df(x1);
      const x4 = prev.points[i + 1].x - eps;
      const y4 = prev.f(x4);
      const d4 = prev.df(x4);
      const x2 = (2 * x1 + x4) / 3;
      const y2 = y1 + (d1 !== null ? d1 : 0) * (x2 - x1);
      const x3 = (x1 + 2 * x4) / 3;
      const y3 = (y4 !== null ? y4 : 0) - (d4 !== null ? d4 : 0) * (x4 - x3);
      const p1 = funcToCanvas(canvas, { x: x1, y: y1 });
      const p2 = funcToCanvas(canvas, { x: x2, y: y2 });
      const p3 = funcToCanvas(canvas, { x: x3, y: y3 });
      const p4 = funcToCanvas(canvas, { x: x4, y: y4 });
      ctx.moveTo(p1.x, p1.y);
      ctx.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
      ctx.stroke();
    }
  }
  // 現在のグラフを描く
  if (graph) {
    ctx.lineWidth = graphLineWidth;
    ctx.strokeStyle = graphLineColor;
    for (let i = 0; i + 1 < graph.points.length; i++) {
      ctx.beginPath();
      const x1 = graph.points[i].x;
      const y1 = graph.points[i].y;
      const d1 = graph.df(x1);
      const x4 = graph.points[i + 1].x - eps;
      const y4 = graph.f(x4);
      const d4 = graph.df(x4);
      const x2 = (2 * x1 + x4) / 3;
      const y2 = y1 + (d1 !== null ? d1 : 0) * (x2 - x1);
      const x3 = (x1 + 2 * x4) / 3;
      const y3 = (y4 !== null ? y4 : 0) - (d4 !== null ? d4 : 0) * (x4 - x3);
      const p1 = funcToCanvas(canvas, { x: x1, y: y1 });
      const p2 = funcToCanvas(canvas, { x: x2, y: y2 });
      const p3 = funcToCanvas(canvas, { x: x3, y: y3 });
      const p4 = funcToCanvas(canvas, { x: x4, y: y4 });
      ctx.moveTo(p1.x, p1.y);
      ctx.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
      ctx.stroke();
    }
  }
  // メモと対応する点を打つ
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < notes.length; i++) {
    const x = notes[i].x;
    if (x !== null) {
      if (graph && graph.from <= x && x <= graph.to) {
        const y = graph.f(x);
        const y2 = graph.d2f(x);
        const n = noteNumber(notes, notes[i].id);
        const color = noteColor(notes[i].id);
        const p = funcToCanvas(canvas, { x: x, y: y });
        ctx.fillStyle = color;
        ctx.font = `${graphFontSize}px bold ${graphFont}`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, graphPointRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText(`${n}`, p.x, p.y + graphFontSize * (y2 > 0 ? 1 : -1));
      } else if (prev && prev.from <= x && x <= prev.to) {
        const y = prev.f(x);
        const y2 = prev.d2f(x);
        const n = noteNumber(notes, notes[i].id);
        const p = funcToCanvas(canvas, { x: x, y: y });
        ctx.font = `${oldGraphFontSize}px bold ${graphFont}`;
        ctx.fillStyle = oldGraphLineColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, oldGraphPointRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText(`${n}`, p.x, p.y + oldGraphFontSize * (y2 > 0 ? 1 : -1));
      }
    }
  }
}

const Graph: React.FunctionComponent<Props> = props => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = React.useState(false);
  const [dragged, setDragged] = React.useState(false);
  const [firstPoint, setFirstPoint] = React.useState<Point | null>(null);
  const [oldGraph, setOldGraph] = React.useState<Graph>(null);
  // キャンバスをクリックしたときのイベントハンドラ
  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): void => {
      const p = canvasToFunc(e);
      if (props.graph && !dragged) {
        if (props.graph.from <= p.x && p.x <= props.graph.to) {
          // x が定義域内だったとき
          if (props.bindingTarget === null) {
            // 紐つけ対象がセットされてなければその時刻と紐ついた新しいメモを作成
            props.setNotes(prev => {
              const note = newNote(prev);
              note.x = p.x;
              const i = prev.findIndex(n => n.x !== null && n.x >= p.x);
              return i >= 0
                ? [...prev.slice(0, i), note, ...prev.slice(i, prev.length)]
                : [...prev, note];
            });
          } else {
            // 紐つけ対象がセットされていれば時刻を紐つける
            props.setNotes(prev => {
              const i = prev.findIndex(n => n.id === props.bindingTarget);
              if (i >= 0) {
                props.setBindingTarget(null);
                return [
                  ...prev.slice(0, i),
                  { id: prev[i].id, x: p.x },
                  ...prev.slice(i + 1, prev.length)
                ];
              }
              return prev;
            });
          }
        }
      }
    },
    [props, dragged]
  );
  // キャンバスでマウスを押下したときのイベントハンドラ
  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setDragged(false);
      if (!canvasRef.current) return;
      const p = canvasToFunc(e);
      if (!props.graph && p.x < maxMarginLeft) {
        // まだグラフがなく、描き始め条件を満たしていれば描画状態を有効にする
        setDrawing(true);
        setFirstPoint(p);
      } else if (
        // すでにグラフがあり、描画再開条件を満たしていれば描画状態を有効にする
        props.graph &&
        props.graph.to < p.x &&
        p.x - props.graph.to < maxResume
      ) {
        setDrawing(true);
      }
    },
    [props]
  );
  // キャンバスでマウスを動かしたときのイベントハンドラ
  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setDragged(true);
      if (!canvasRef.current) return;
      const p = canvasToFunc(e);
      if (drawing) {
        if (!props.graph && firstPoint && p.x - firstPoint.x > minDelta) {
          // まだグラフがなくて点をとる条件満たしていたらを最初の2点をとる
          props.setPoints([firstPoint, p]);
          setFirstPoint(null);
        } else if (
          // すでにグラフがあって新しく標本点をとる条件満たしていたら標本点をとる
          props.graph &&
          p.x > props.graph.from &&
          p.x - props.graph.to > minDelta
        ) {
          props.setPoints(prev => [...prev, p]);
        }
      }
    },
    [props, drawing, firstPoint]
  );
  // グラフの描き終わりに呼ばれる
  const onEndDrawing = React.useCallback(() => {
    setDrawing(false);
    setFirstPoint(null);
  }, []);
  // 前回のグラフを消すイベントハンドラ
  const clear = React.useCallback(() => {
    setOldGraph(props.graph);
    props.setPoints([]);
  }, [props]);
  // 前回のグラフを消すイベントハンドラ
  const clearOld = React.useCallback(() => {
    setOldGraph(null);
  }, []);
  // グラフが更新されたら描画し直す
  React.useEffect(() => {
    if (canvasRef.current) {
      drawGraph(canvasRef.current, props.graph, oldGraph, props.notes);
    }
  }, [oldGraph, props]);
  return (
    <div className="graph">
      <div className="graph-info">
        最小値: {props.graph?.min?.toFixed(2) ?? "n/a"}, 最大値:
        {props.graph?.max?.toFixed(2) ?? "n/a"}
      </div>
      <canvas
        className="graph-canvas"
        width={width}
        height={height}
        ref={canvasRef}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onEndDrawing}
        onMouseLeave={onEndDrawing}
      />
      <div className="graph-menu">
        <button onClick={clear}>書き直す</button>
        <button onClick={clearOld}>履歴を消去</button>
        <span className="graph-status">
          {props.bindingTarget === null ? "挿入モード" : "バインドモード"}
        </span>
      </div>
    </div>
  );
};

export default Graph;
