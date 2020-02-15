// グラフの点
type Point = { x: number; y: number };
type SetPointsFunc = React.Dispatch<React.SetStateAction<Point[]>>;

// メモのデータ
type Note = { id: number; x: number | null };
type SetNotesFunc = React.Dispatch<React.SetStateAction<Note[]>>;

// 紐つけるメモの参照
type BindingTarget = number | null;
type SetBindingTargetFunc = React.Dispatch<React.SetStateAction<BindingTarget>>;

// グラフの断片を表すデータ
type Curve = {
  f: (x: number) => number; // 曲線の関数
  df: (x: number) => number; // f の導関数
  d2f: (x: number) => number; // f の二次導関数
  from: number; // 定義域の始まり
  to: number; // 定義域の終わり
  min: number; // 定義域内での f(x) の最小値
  max: number; // 定義域内での f(x) の最大値
};

// グラフ全体の描画に必要なデータ
type Graph = (Curve & { points: Point[] }) | null;
