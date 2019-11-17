function linearLineSeg(p1: Point, p2: Point): Curve {
  const a = (p1.y - p2.y) / (p1.x - p2.x);
  const b = p1.y - a * p1.x;
  const f = (x: number): number => a * x + b;
  const df = (x: number): number => 0 * x + a;
  const d2f = (x: number): number => 0 * x;
  const start = Math.min(p1.x, p2.x);
  const end = Math.max(p1.x, p2.x);
  const exts = [f(start), f(end)];
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f: f, df: df, d2f: d2f, start: start, end: end, min: min, max: max };
}

function quadraticCurveLeftSeg(p1: Point, p2: Point, p3: Point): Curve {
  const a =
    ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)) /
    ((p1.x - p2.x) * (p1.x - p3.x) * (p2.x - p3.x));
  const b = (p1.y - p2.y) / (p1.x - p2.x) - a * (p1.x + p2.x);
  const c = p1.y - a * p1.x ** 2 - b * p1.x;
  const f = (x: number): number => a * x ** 2 + b * x + c;
  const df = (x: number): number => 2 * a * x + b;
  const d2f = (x: number): number => 0 * x + 2 * a;
  const start = Math.min(p1.x, p2.x, p3.x);
  const end = [p1.x, p2.x, p3.x].sort()[1];
  const exts = [f(start), f(end)];
  if (a !== 0) {
    const edge = -b / (2 * a);
    if (start < edge && edge < end) exts.push(f(edge));
  }
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f: f, df: df, d2f: d2f, start: start, end: end, min: min, max: max };
}

function quadraticCurveRightSeg(p1: Point, p2: Point, p3: Point): Curve {
  const a =
    ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)) /
    ((p1.x - p2.x) * (p1.x - p3.x) * (p2.x - p3.x));
  const b = (p1.y - p2.y) / (p1.x - p2.x) - a * (p1.x + p2.x);
  const c = p1.y - a * p1.x ** 2 - b * p1.x;
  const f = (x: number): number => a * x ** 2 + b * x + c;
  const df = (x: number): number => 2 * a * x + b;
  const d2f = (x: number): number => 0 * x + 2 * a;
  const start = [p1.x, p2.x, p3.x].sort()[1];
  const end = Math.max(p1.x, p2.x, p3.x);
  const exts = [f(start), f(end)];
  if (a !== 0) {
    const edge = -b / (2 * a);
    if (start < edge && edge < end) exts.push(f(edge));
  }
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f: f, df: df, d2f: d2f, start: start, end: end, min: min, max: max };
}

function cubicCurveSeg(p1: Point, p2: Point, p3: Point, p4: Point): Curve {
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
  const d2f = (x: number): number => 6 * a * x + 2 * b;
  const sort = [p1.x, p2.x, p3.x, p4.x].sort();
  const start = sort[1];
  const end = sort[2];
  const hasExt = b ** 2 - 3 * a * c > 0;
  const exts = [f(start), f(end)];
  if (hasExt) {
    if (a !== 0) {
      const edge1 = (-2 * b + Math.sqrt((2 * b) ** 2 - 12 * a * c)) / (6 * a);
      const edge2 = (-2 * b - Math.sqrt((2 * b) ** 2 - 12 * a * c)) / (6 * a);
      if (start < edge1 && edge1 < end) exts.push(f(edge1));
      if (start < edge2 && edge2 < end) exts.push(f(edge2));
    } else if (b !== 0) {
      const edge = -c / (2 * b);
      if (start < edge && edge < end) exts.push(f(edge));
    }
  }
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f: f, df: df, d2f: d2f, start: start, end: end, min: min, max: max };
}

function makeGraph(points: Point[]): Graph {
  points = points.sort((a, b) => a.x - b.x);
  const start = points.length > 0 ? points[0].x : null;
  const end = points.length > 0 ? points[points.length - 1].x : null;
  const curves: Curve[] = [];
  for (let i = 0; i + 1 < points.length; i++) {
    if (i - 1 >= 0) {
      if (i + 2 < points.length) {
        curves.push(
          cubicCurveSeg(points[i - 1], points[i], points[i + 1], points[i + 2])
        );
      } else {
        curves.push(
          quadraticCurveRightSeg(points[i - 1], points[i], points[i + 1])
        );
      }
    } else {
      if (i + 2 < points.length) {
        curves.push(
          quadraticCurveLeftSeg(points[i], points[i + 1], points[i + 2])
        );
      } else {
        curves.push(linearLineSeg(points[i], points[i + 1]));
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
    return i >= 0 ? curves[i].df(x) : null;
  };
  const d2f = (x: number): number | null => {
    if (start === null || x < start) return null;
    if (end === null || x > end) return null;
    const i = points.findIndex(p => p.x >= x) - 1;
    return i >= 0 ? curves[i].d2f(x) : null;
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
    d2f: d2f,
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

// TODO: algorithm
function noteColor(id: number): string {
  return id % 2 === 0 ? "blue" : "red";
}

function noteNumber(notes: Note[], id: number): number | null {
  const i = notes
    .filter(n => n.x !== null)
    .sort((a, b) => (a.x !== null && b.x !== null ? a.x - b.x : 0))
    .findIndex(n => n.id === id);
  return i >= 0 ? i + 1 : null;
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

export { makeGraph, newNote, noteColor, noteNumber, download };
