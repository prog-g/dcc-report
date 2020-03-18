// 3点を通る2次曲線の左側2点部分の断片を返す関数
function quadraticCurveLeftSegment(p1: Point, p2: Point, p3: Point): Curve {
  // 曲線の 関数, 導関数, 二次導関数 を求める
  const a =
    ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)) /
    ((p1.x - p2.x) * (p1.x - p3.x) * (p2.x - p3.x));
  const b = (p1.y - p2.y) / (p1.x - p2.x) - a * (p1.x + p2.x);
  const c = p1.y - a * p1.x ** 2 - b * p1.x;
  const f = (x: number): number => a * x ** 2 + b * x + c;
  const df = (x: number): number => 2 * a * x + b;
  const d2f = (): number => 2 * a;

  // 定義域を求める
  const from = p1.x;
  const to = p2.x;

  // 定義域内での f(x) の 最小値, 最大値 を求める
  const exts = [f(from), f(to)];
  // 定義域内に極値があるなら 最大値, 最小値 の候補にこれを追加する
  if (a !== 0) {
    const edge = -b / (2 * a);
    if (from < edge && edge < to) exts.push(f(edge));
  }
  const min = exts.reduce((a, y) => (y < a ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));

  return { f, df, d2f, from, to, min, max };
}

// 3点を通る2次曲線の右側2点部分の断片を返す関数
function quadraticCurveRightSegment(p1: Point, p2: Point, p3: Point): Curve {
  // 曲線の 関数, 導関数, 二次導関数 を求める
  // d2f の導出までは quadraticCurveLeftSegment と全く同じ
  const a =
    ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)) /
    ((p1.x - p2.x) * (p1.x - p3.x) * (p2.x - p3.x));
  const b = (p1.y - p2.y) / (p1.x - p2.x) - a * (p1.x + p2.x);
  const c = p1.y - a * p1.x ** 2 - b * p1.x;
  const f = (x: number): number => a * x ** 2 + b * x + c;
  const df = (x: number): number => 2 * a * x + b;
  const d2f = (): number => 2 * a;

  // 定義域を求める
  const from = p2.x;
  const to = p3.x;

  // 定義域内での f(x) の 最小値, 最大値 を求める
  const exts = [f(from), f(to)];
  // 定義域内に極値があるなら 最大値, 最小値 の候補にこれを追加する
  if (a !== 0) {
    const edge = -b / (2 * a);
    if (from < edge && edge < to) exts.push(f(edge));
  }
  const min = exts.reduce((a, y) => (y < a ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));

  return { f, df, d2f, from, to, min, max };
}

// 4点を通る3次曲線の真ん中2点部分の断片を返す関数
function cubicCurveSegment(p1: Point, p2: Point, p3: Point, p4: Point): Curve {
  // 曲線の 関数, 導関数, 二次導関数 を求める
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

  // 定義域を求める
  const from = p2.x;
  const to = p3.x;

  // 定義域内での f(x) の 最小値, 最大値 を求める
  const exts = [f(from), f(to)];
  // 定義域内に極値があるなら 最大値, 最小値 の候補にこれを追加する
  if (0 < b ** 2 - 3 * a * c) {
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
  const min = exts.reduce((a, y) => (y < a ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));

  return { f, df, d2f, from, to, min, max };
}

// 2点を通る直線の断片を返す関数
function linearLineSegment(p1: Point, p2: Point): Curve {
  // 直線の 関数, 導関数, 二次導関数 を求める
  const a = (p1.y - p2.y) / (p1.x - p2.x);
  const b = p1.y - a * p1.x;
  const f = (x: number): number => a * x + b;
  const df = (): number => a;
  const d2f = (): number => 0;

  // 定義域を求める
  const from = p1.x;
  const to = p2.x;

  // 定義域内での f(x) の 最小値, 最大値 を求める
  const exts = [f(from), f(to)];
  const min = exts.reduce((a, y) => (y < a ? y : a));
  const max = exts.reduce((a, y) => (a < y ? y : a));

  return { f, df, d2f, from, to, min, max };
}

// サンプリングした点列からラグランジュ補間したグラフのデータを作る関数
function makeGraph(points: Point[]): Graph {
  // 点が 1 個以下で定義域すら求められない場合は null を返す
  if (points.length <= 1) return null;

  // 定義域を求める
  const from = points[0].x;
  const to = points[points.length - 1].x;

  // 1 点ずつずらしながら補完されたグラフの断片を作る
  const curves: Curve[] = [];
  if (points.length === 2) {
    // 点が 2 個だけの場合は直線にして終わり
    curves.push(linearLineSegment(points[0], points[1]));
  } else {
    // 点が 3 個の場合は left -> right の順に点を渡す
    // 点が 4 個以上の場合は left -> cubic -> ... -> right の順に点を渡す
    for (let i = 0; i <= points.length - 2; i++) {
      if (i === 0) {
        // グラフの左端で 3 点をとる
        curves.push(quadraticCurveLeftSegment(points[0], points[1], points[2]));
      } else if (i === points.length - 2) {
        // グラフの右端で 3 点をとる
        curves.push(
          quadraticCurveRightSegment(points[i - 1], points[i], points[i + 1])
        );
      } else {
        curves.push(
          cubicCurveSegment(
            points[i - 1],
            points[i],
            points[i + 1],
            points[i + 2]
          )
        );
      }
    }
  }

  // curves を結合しグラフ全体の 関数, 導関数, 二次導関数 を作る
  const f = (x: number): number => {
    // x が定義域の外にある場合は、グラフの 左端, 右端 の断片の関数を使う
    if (x < from) return curves[0].f(x);
    if (to <= x) return curves[curves.length - 1].f(x);

    // x 座標が引数の x を超える直前の点のインデックスを求める
    const i = points.findIndex(p => x < p.x) - 1;
    return curves[i].f(x);
  };

  const df = (x: number): number => {
    // x が定義域の外にある場合は、グラフの 左端, 右端 の断片の導関数を使う
    if (x < from) return curves[0].df(x);
    if (x >= to) return curves[curves.length - 1].df(x);

    // x 座標が引数の x を超える直前の点のインデックスを求める
    const i = points.findIndex(p => x < p.x) - 1;
    return curves[i].df(x);
  };

  const d2f = (x: number): number => {
    // x が定義域の外にある場合は、グラフの 左端, 右端 の断片の二次導関数を使う
    if (x < from) return curves[0].d2f(x);
    if (x >= to) return curves[curves.length - 1].d2f(x);

    // x 座標が引数の x を超える直前の点のインデックスを求める
    const i = points.findIndex(p => x < p.x) - 1;
    return curves[i].d2f(x);
  };

  // 定義域内での f(x) の 最小値, 最大値 を求める
  const min = Math.min(...curves.map(c => c.min));
  const max = Math.max(...curves.map(c => c.max));

  return { f, df, d2f, from, to, min, max, points };
}

export { makeGraph };
