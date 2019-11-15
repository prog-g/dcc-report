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
  
  for (let i = 0; i < points.length; i++) {
    if (){}

  }


  const f = (x: number): number | null => {};

  return {
    f: makeGraphFunction(points),
    df: makeGraphDerivativeFunction(points),
    min:
      points.length > 0
        ? points.reduce((a, p) => (a < p.y ? p.y : a), points[0].y)
        : null, // TODO: Not accurate
    max: 1, // TODO: Not accurate
    points: points
  };
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

function drawGraph(
  canvas: HTMLCanvasElement,
  graph: Graph,
  prev: Graph | null,
  notes: Note[]
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  // Background

  // Grid

  //
  ctx.bezierCurveTo;
  //
  ctx;
}

function newNote(currentNotes: Note[]): Note {
  const maxId = currentNotes.reduce((a, n) => (a < n.id ? n.id : a), 0);
  return { id: maxId + 1, x: null };
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

export { makeGraph, drawGraph, newNote, noteColor, noteNumber, download };

