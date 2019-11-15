function linearLine(p1: Point, p2: Point): Curve {
  const a = (p1.y - p2.y) / (p1.x - p2.x);
  const b = p1.y - a * p1.x;
  const f = (x: number): number => a * x + b;
  const df = (x: number): number => a;
  const exts = [f(p1.x), f(p2.x)];
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f: f, df: df, min: min, max: max };
}

function quadraticCurve(p1: Point, p2: Point, p3: Point): Curve {
  const a =
    ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)) /
    ((p1.x - p2.x) * (p1.x - p3.x) * (p2.x - p3.x));
  const b = (p1.y - p2.y) / (p1.x - p2.x) - a * (p1.x + p2.x);
  const c = p1.y - a * p1.x ** 2 - b * p1.x;
  const f = (x: number): number => a * x ** 2 + b * x + c;
  const df = (x: number): number => 2 * a * x + b;
  const s = Math.min(p1.x, p2.x, p3.x);
  const e = Math.max(p1.x, p2.x, p3.x);
  const exts = [f(s), f(e)];
  if (a !== 0) {
    exts.push(f(-b / (2 * a)));
  }
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f: f, df: df, min: min, max: max };
}

function cubicCurve(p1: Point, p2: Point, p3: Point, p4: Point): Curve {
  const m1 = p1.y / ((p1.x - p2.x) * (p1.x - p3.x) * (p1.x - p4.x));
  const m2 = p2.y / ((p2.x - p1.x) * (p2.x - p3.x) * (p2.x - p4.x));
  const m3 = p3.y / ((p3.x - p1.x) * (p3.x - p2.x) * (p3.x - p4.x));
  const m4 = p4.y / ((p4.x - p1.x) * (p4.x - p2.x) * (p4.x - p3.x));
  const a = m1 + m2 + m3 + m4;
  const b =
    -(p2.x + p3.x + p4.x) * m1 -
    (p1.x + p3.x + p4.x) * m2 -
    (p1.x + p2.x + p4.x) * m3 -
    (p1.x + p2.x + p3.x) * m4;
  const c =
    (p2.x * p3.x + p3.x * p4.x + p4.x * p2.x) * m1 +
    (p1.x * p3.x + p3.x * p4.x + p4.x * p1.x) * m2 +
    (p1.x * p2.x + p2.x * p4.x + p4.x * p1.x) * m3 +
    (p1.x * p2.x + p2.x * p3.x + p3.x * p1.x) * m4;
  const d =
    -m1 * p2.x * p3.x * p4.x -
    m2 * p1.x * p3.x * p4.x -
    m3 * p1.x * p2.x * p4.x -
    m4 * p1.x * p2.x * p3.x;
  const f = (x: number): number => a * x ** 3 + b * x ** 2 + c * x + d;
  const df = (x: number): number => 3 * a * x ** 2 + 2 * b * x + c;
  const s = Math.min(p1.x, p2.x, p3.x, p4.x);
  const e = Math.max(p1.x, p2.x, p3.x, p4.x);
  const hasExt = b ** 2 - 3 * a * c > 0;
  const exts = [f(s), f(e)];
  if (hasExt) {
    if (3 * a !== 0) {
      const x1 = (-2 * b + Math.sqrt((2 * b) ** 2 - 12 * a * c)) / (6 * a);
      const x2 = (-2 * b - Math.sqrt((2 * b) ** 2 - 12 * a * c)) / (6 * a);
      exts.push(f(x1), f(x2));
    } else if (2 * b !== 0) {
      const x = -c / (2 * b);
      exts.push(f(x));
    }
  }
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f: f, df: df, min: min, max: max };
}

function makeGraph(points: Point[]): Graph {
  points = points.sort((a, b) => a.x - b.x);
  const start =
    points.length > 0
      ? Math.min(points[0].x, points[points.length - 1].x)
      : null;
  const end =
    points.length > 0
      ? Math.max(points[0].x, points[points.length - 1].x)
      : null;
  const curves: Curve[] = [];
  for (let i = 0; i + 1 < points.length; i++) {
    if (i - 1 >= 0) {
      if (i + 2 < points.length) {
        curves.push(
          cubicCurve(points[i - 1], points[i], points[i + 1], points[i + 2])
        );
      } else {
        curves.push(quadraticCurve(points[i - 1], points[i], points[i + 1]));
      }
    } else {
      if (i + 2 < points.length) {
        curves.push(quadraticCurve(points[i], points[i + 1], points[i + 2]));
      } else {
        curves.push(linearLine(points[i], points[i + 1]));
      }
    }
  }
  const f = (x: number): number | null => {
    if (start === null || x < start) return null;
    if (end === null || x > end) return null;
    const i = points.findIndex(p => p.x >= x) - 1;
    return i >= 0 ? curves[i].f(x) : null;
  };
  const df = (x: number): number | null => {
    if (start === null || x < start) return null;
    if (end === null || x > end) return null;
    const i = points.findIndex(p => p.x >= x) - 1;
    return i >= 0 ? curves[i].f(x) : null;
  };
  const min =
    curves.length > 0
      ? curves.reduce((a, c) => (a.min > c.min ? c : a)).min
      : null;
  const max =
    curves.length > 0
      ? curves.reduce((a, c) => (a.max < c.max ? c : a)).max
      : null;
  return {
    f: f,
    df: df,
    start: start,
    end: end,
    min: min,
    max: max,
    points: points
  };
}

function newNote(currentNotes: Note[]): Note {
  const maxId = currentNotes.reduce((a, n) => (a < n.id ? n.id : a), 0);
  return { id: maxId + 1, x: null };
}

// TODO
function noteColor(notes: Note[], id: number): string {
  return id % 2 === 0 ? "blue" : "red";
}

function noteNumber(notes: Note[], id: number): number | null {
  const i = notes
    .filter(n => n.x !== null)
    // TDDO: non-null assertion warning
    .sort((a, b) => a.x! - b.x!)
    .findIndex(n => n.id === id);
  return i === -1 ? null : i + 1;
}

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
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";
  ctx.beginPath();
  for (let i = 0; i + 1 < graph.points.length; i++) {
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
  }
  ctx.closePath();
  ctx.stroke();
}

function now(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const date = `${now.getDate()}`.padStart(2, "0");
  const hours = `${now.getHours()}`.padStart(2, "0");
  const minutes = `${now.getMinutes()}`.padStart(2, "0");
  const seconds = `${now.getSeconds()}`.padStart(2, "0");
  return `${year}-${month}-${date}_${hours}-${minutes}-${seconds}`;
}

const download: () => void = () => {
  const doc = document.documentElement.cloneNode(true) as HTMLElement;
  const script = doc.getElementsByTagName("script")[0];
  doc.getElementsByTagName("body")[0].removeChild(script);
  const html = `<!DOCTYPE html>\n${doc.outerHTML}`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([html], { type: "text/html" }));
  a.download = `${now()}.html`;
  a.dispatchEvent(new MouseEvent("click"));
};

export {
  makeGraph,
  drawGraph,
  newNote,
  noteColor,
  noteNumber,
  canvasToFunc,
  download
};
