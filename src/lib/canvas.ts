/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { noteColor, pointNumber } from "./note";

const scaleX = 100; // 関数空間の横の長さ
const scaleY = 100; // 関数空間の縦の長さ
const graphLineWidth = 2; // グラフ曲線の描画幅
const graphPointRadius = 4; // グラフの点の半径
const graphFont = "sans-serif"; // グラフで使うフォント
const graphFontSize = 20; // グラフのフォントサイズ
const graphLineColor = "white"; // グラフ曲線の描画色
const oldGraphLineWidth = 1.5; // 前回のグラフ曲線の描画幅
const oldGraphPointRadius = 3; // 前回のグラフの点の半径
const oldGraphFontSize = 16; // 前回グラフで使うフォント
const oldGraphLineColor = "gray"; // 前回グラフ曲線の描画色
const gridx = 10; // グリッドの x 分割数
const gridy = 4; // グリッドの y 分割数
const gridLineWidth = 1; // グリッド線の描画幅
const gridLineColor = "gray"; // グリッド線の描画色
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
  const ctx = canvas.getContext("2d")!;
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
      const { x: x1, y: y1 } = prev.points[i];
      const d1 = prev.df(x1);
      const x4 = prev.points[i + 1].x - eps;
      const y4 = prev.f(x4);
      const d4 = prev.df(x4);
      // 欲しいベジエ曲線の制御点求める
      const x2 = (2 * x1 + x4) / 3;
      const y2 = y1 + d1 * (x2 - x1);
      const x3 = (x1 + 2 * x4) / 3;
      const y3 = y4 - d4 * (x4 - x3);
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
      const { x: x1, y: y1 } = graph.points[i];
      const d1 = graph.df(x1);
      const x4 = graph.points[i + 1].x - eps;
      const y4 = graph.f(x4);
      const d4 = graph.df(x4);
      // 欲しいベジエ曲線の制御点求める
      const x2 = (2 * x1 + x4) / 3;
      const y2 = y1 + d1 * (x2 - x1);
      const x3 = (x1 + 2 * x4) / 3;
      const y3 = y4 - d4 * (x4 - x3);
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
        const n = pointNumber(notes, notes[i].id);
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
        const n = pointNumber(notes, notes[i].id);
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

export { canvasToFunc, drawGraph };
