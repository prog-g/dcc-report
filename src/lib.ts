// 2点を通る直線を返す
function linearLineSegment(p1: Point, p2: Point): Curve {
  // 多項式の係数を求める
  const a = (p1.y - p2.y) / (p1.x - p2.x);
  const b = p1.y - a * p1.x;
  // 曲線の関数、導関数、二次導関数
  const f = (x: number): number => a * x + b;
  const df = (): number => a;
  const d2f = (): number => 0;
  // 定義域
  const from = p1.x;
  const to = p2.x;
  // 定義域内の最小値と最大値を求める
  const exts = [f(from), f(to)];
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f, df, d2f, from, to, min, max };
}

// 3点を通る2次曲線の左側2点部分の断片を返す（右側を返す関数とは定義域のみ異なる）
function quadraticCurveLeftSegment(p1: Point, p2: Point, p3: Point): Curve {
  // 多項式の係数を求める
  const a =
    ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)) /
    ((p1.x - p2.x) * (p1.x - p3.x) * (p2.x - p3.x));
  const b = (p1.y - p2.y) / (p1.x - p2.x) - a * (p1.x + p2.x);
  const c = p1.y - a * p1.x ** 2 - b * p1.x;
  // 曲線の関数、導関数、二次導関数
  const f = (x: number): number => a * x ** 2 + b * x + c;
  const df = (x: number): number => 2 * a * x + b;
  const d2f = (): number => 2 * a;
  // 定義域
  const from = p1.x;
  const to = p2.x;
  // 定義域内の最小値と最大値を求める
  const exts = [f(from), f(to)];
  if (a !== 0) {
    // 定義域内に極値を持つなら候補に追加
    const edge = -b / (2 * a);
    if (from < edge && edge < to) exts.push(f(edge));
  }
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f, df, d2f, from, to, min, max };
}

// 3点を通る2次曲線の右側2点部分の断片を返す（左側を返す関数とは定義域のみ異なる）
function quadraticCurveRightSegment(p1: Point, p2: Point, p3: Point): Curve {
  // 多項式の係数を求める
  const a =
    ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)) /
    ((p1.x - p2.x) * (p1.x - p3.x) * (p2.x - p3.x));
  const b = (p1.y - p2.y) / (p1.x - p2.x) - a * (p1.x + p2.x);
  const c = p1.y - a * p1.x ** 2 - b * p1.x;
  // 曲線の関数、導関数、二次導関数
  const f = (x: number): number => a * x ** 2 + b * x + c;
  const df = (x: number): number => 2 * a * x + b;
  const d2f = (): number => 2 * a;
  // 定義域
  const from = p2.x;
  const to = p3.x;
  // 定義域内の最小値と最大値を求める
  const exts = [f(from), f(to)];
  if (a !== 0) {
    // 定義域内に極値を持つなら候補に追加
    const edge = -b / (2 * a);
    if (from < edge && edge < to) exts.push(f(edge));
  }
  const min = exts.reduce((a, y) => (a > y ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));
  return { f, df, d2f, from, to, min, max };
}

// 4点を通る3次曲線の真ん中2点部分の断片を返す
function cubicCurveSegment(p1: Point, p2: Point, p3: Point, p4: Point): Curve {
  // 多項式の係数を求める
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
  // 曲線の関数、導関数、二次導関数
  const f = (x: number): number => a * x ** 3 + b * x ** 2 + c * x + d;
  const df = (x: number): number => 3 * a * x ** 2 + 2 * b * x + c;
  const d2f = (x: number): number => 6 * a * x + 2 * b;
  // 定義域
  const from = p2.x;
  const to = p3.x;
  // 定義域内の最小値と最大値を求める
  const exts = [f(from), f(to)];
  if (b ** 2 - 3 * a * c > 0) {
    // 定義域内に極値を持つなら候補に追加
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

// 複数の点から補間した曲線グラフを返す（複数の Curve を合体させて1つの曲線にします）
function makeGraph(points: Point[]): Graph {
  // 定義域
  const from = points.length > 1 ? points[0].x : null;
  const to = points.length > 1 ? points[points.length - 1].x : null;
  // 1点ずつずらしながら曲線の断片を作成
  const curves: Curve[] = [];
  for (let i = 0; i + 1 < points.length; i++) {
    if (i - 1 >= 0) {
      if (i + 2 < points.length) {
        // 4点が取れる場合
        curves.push(
          cubicCurveSegment(
            points[i - 1],
            points[i],
            points[i + 1],
            points[i + 2]
          )
        );
      } else {
        // グラフ右端で3点をとる場合
        curves.push(
          quadraticCurveRightSegment(points[i - 1], points[i], points[i + 1])
        );
      }
    } else {
      if (i + 2 < points.length) {
        // グラフ左端で3点をとる場合
        curves.push(
          quadraticCurveLeftSegment(points[i], points[i + 1], points[i + 2])
        );
      } else {
        // 2点しか与えられなかった場合は直線を作る
        curves.push(linearLineSegment(points[i], points[i + 1]));
      }
    }
  }
  // 曲線の関数、導関数、二次導関数（定義域外では null を返す）
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
  // 最大値と最小値を調べる（定義域外では null を返す）
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
