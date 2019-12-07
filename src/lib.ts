function linearLineSegment(p1: Point, p2: Point): Curve {
  const a = (p1.y - p2.y) / (p1.x - p2.x);
  const b = p1.y - a * p1.x;
  const f = (x: number): number => a * x + b;
  const df = (): number => a;
  const d2f = (): number => 0;
  const from = Math.min(p1.x, p2.x);
  const to = Math.max(p1.x, p2.x);
  const exts = [f(from), f(to)];
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f, df, d2f, from, to, min, max };
}

function quadraticCurveLeftSegment(p1: Point, p2: Point, p3: Point): Curve {
  const a =
    ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)) /
    ((p1.x - p2.x) * (p1.x - p3.x) * (p2.x - p3.x));
  const b = (p1.y - p2.y) / (p1.x - p2.x) - a * (p1.x + p2.x);
  const c = p1.y - a * p1.x ** 2 - b * p1.x;
  const f = (x: number): number => a * x ** 2 + b * x + c;
  const df = (x: number): number => 2 * a * x + b;
  const d2f = (): number => 2 * a;
  const from = Math.min(p1.x, p2.x, p3.x);
  const to = [p1.x, p2.x, p3.x].sort()[1];
  const exts = [f(from), f(to)];
  if (a !== 0) {
    const edge = -b / (2 * a);
    if (from < edge && edge < to) exts.push(f(edge));
  }
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f, df, d2f, from, to, min, max };
}

function quadraticCurveRightSegment(p1: Point, p2: Point, p3: Point): Curve {
  const a =
    ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)) /
    ((p1.x - p2.x) * (p1.x - p3.x) * (p2.x - p3.x));
  const b = (p1.y - p2.y) / (p1.x - p2.x) - a * (p1.x + p2.x);
  const c = p1.y - a * p1.x ** 2 - b * p1.x;
  const f = (x: number): number => a * x ** 2 + b * x + c;
  const df = (x: number): number => 2 * a * x + b;
  const d2f = (): number => 2 * a;
  const from = [p1.x, p2.x, p3.x].sort()[1];
  const to = Math.max(p1.x, p2.x, p3.x);
  const exts = [f(from), f(to)];
  if (a !== 0) {
    const edge = -b / (2 * a);
    if (from < edge && edge < to) exts.push(f(edge));
  }
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f, df, d2f, from, to, min, max };
}

function cubicCurveSegment(p1: Point, p2: Point, p3: Point, p4: Point): Curve {
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
  const sorted = [p1.x, p2.x, p3.x, p4.x].sort();
  const from = sorted[1];
  const to = sorted[2];
  const exts = [f(from), f(to)];
  if (b ** 2 - 3 * a * c > 0) {
    if (a !== 0) {
      const edge1 = (-2 * b + Math.sqrt((2 * b) ** 2 - 12 * a * c)) / (6 * a);
      const edge2 = (-2 * b - Math.sqrt((2 * b) ** 2 - 12 * a * c)) / (6 * a);
      if (from < edge1 && edge1 < to) exts.push(f(edge1));
      if (from < edge2 && edge2 < to) exts.push(f(edge2));
    } else if (b !== 0) {
      const edge = -c / (2 * b);
      if (from < edge && edge < to) exts.push(f(edge));
    }
  }
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f, df, d2f, from, to, min, max };
}

function makeGraph(points: Point[]): Graph {
  //points = points.sort((a, b) => a.x - b.x);
  const from = points.length > 0 ? points[0].x : null;
  const to = points.length > 0 ? points[points.length - 1].x : null;
  const curves: Curve[] = [];
  for (let i = 0; i + 1 < points.length; i++) {
    if (i - 1 >= 0) {
      if (i + 2 < points.length) {
        curves.push(
          cubicCurveSegment(
            points[i - 1],
            points[i],
            points[i + 1],
            points[i + 2]
          )
        );
      } else {
        curves.push(
          quadraticCurveRightSegment(points[i - 1], points[i], points[i + 1])
        );
      }
    } else {
      if (i + 2 < points.length) {
        curves.push(
          quadraticCurveLeftSegment(points[i], points[i + 1], points[i + 2])
        );
      } else {
        curves.push(linearLineSegment(points[i], points[i + 1]));
      }
    }
  }
  const f = (x: number): number | null => {
    if (from === null || x < from) return null;
    if (to === null || x > to) return null;
    const i = points.findIndex(p => p.x > x) - 1;
    if (i >= 0) return curves[i].f(x);
    if (x === to) return curves[curves.length - 1].f(x);
    return null;
  };
  const df = (x: number): number | null => {
    if (from === null || x < from) return null;
    if (to === null || x > to) return null;
    const i = points.findIndex(p => p.x > x) - 1;
    if (i >= 0) return curves[i].df(x);
    if (x === to) return curves[curves.length - 1].df(x);
    return null;
  };
  const d2f = (x: number): number | null => {
    if (from === null || x < from) return null;
    if (to === null || x > to) return null;
    const i = points.findIndex(p => p.x > x) - 1;
    if (i >= 0) return curves[i].d2f(x);
    if (x === to) return curves[curves.length - 1].d2f(x);
    return null;
  };
  const min =
    curves.length > 0
      ? curves.reduce((a, c) => (a.min > c.min ? c : a)).min
      : null;
  const max =
    curves.length > 0
      ? curves.reduce((a, c) => (a.max < c.max ? c : a)).max
      : null;
  return { f, df, d2f, from, to, min, max, points };
}

function newNote(currentNotes: NoteState[]): NoteState {
  const maxId = currentNotes.reduce((a, n) => (a < n.id ? n.id : a), 0);
  return { id: maxId + 1 };
}

function appendNewNote(setNotes: SetNotesFunc): void {
  setNotes(prev => [...prev, newNote(prev)]);
}

function insertNewNoteBefore(setNotes: SetNotesFunc, id: number): void {
  setNotes(prev => {
    const i = prev.findIndex(n => n.id === id);
    return [...prev.slice(0, i), newNote(prev), ...prev.slice(i, prev.length)];
  });
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

export { makeGraph, appendNewNote, insertNewNoteBefore, download };
