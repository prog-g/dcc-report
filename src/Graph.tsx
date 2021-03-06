import React from "react";
import { canvasToFunc, drawGraph } from "./lib/canvas";
import { newNote } from "./lib/note";

const minDelta = 0.4; // 標本点の x の最小間隔
const maxResume = 2.5; // 描画再開とみなす標本点の x の最大距離
const maxMarginLeft = 5; // 定義域の始まりの上限
const width = 1000; // キャンバスの横の長さ
const height = 500; // キャンバスの縦の長さ

type Props = {
  graph: Graph;
  setPoints: SetPoints;
  notes: Notes;
  setNotes: SetNotes;
  bindingTargetId: BindingTargetId;
  setBindingTargetId: SetBindingTargetId;
};

const Graph: React.FunctionComponent<Props> = (props) => {
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
          if (props.bindingTargetId === null) {
            // 紐つけ対象がセットされてなければその時刻と紐ついた新しいメモを作成
            props.setNotes((prev) => {
              const note = newNote(prev);
              note.x = p.x;
              const i = prev.findIndex((n) => n.x !== null && n.x >= p.x);
              return i >= 0
                ? [...prev.slice(0, i), note, ...prev.slice(i, prev.length)]
                : [...prev, note];
            });
          } else {
            // 紐つけ対象がセットされていれば時刻を紐つける
            props.setNotes((prev) => {
              const i = prev.findIndex((n) => n.id === props.bindingTargetId);
              if (i >= 0) {
                props.setBindingTargetId(null);
                return [
                  ...prev.slice(0, i),
                  { id: prev[i].id, x: p.x },
                  ...prev.slice(i + 1, prev.length),
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
          props.setPoints((prev) => [...prev, p]);
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
      <span className="graph-info">
        開始値: {props.graph?.f(props.graph.from)?.toFixed(2) ?? "なし"},
        終了値: {props.graph?.f(props.graph.to)?.toFixed(2) ?? "なし"}
        <br />
        最小値: {props.graph?.min?.toFixed(2) ?? "なし"}, 最大値:{" "}
        {props.graph?.max?.toFixed(2) ?? "なし"}
      </span>
      <canvas
        className="graph-canvas"
        width={width}
        height={height}
        ref={canvasRef}
        onClick={onClick}
        onPointerDown={onMouseDown}
        onPointerMove={onMouseMove}
        onPointerUp={onEndDrawing}
        onPointerLeave={onEndDrawing}
        onPointerCancel={onEndDrawing}
      />
      <div className="graph-menu">
        <button onClick={clear}>書き直す</button>
        <button onClick={clearOld}>履歴を消去</button>
        <span className="graph-mode">
          {props.bindingTargetId === null ? "挿入モード" : "バインドモード"}
        </span>
      </div>
    </div>
  );
};

export default Graph;
export { maxMarginLeft };
