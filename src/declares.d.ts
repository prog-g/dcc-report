type Point = { x: number; y: number };
type SetPointsFunc = React.Dispatch<React.SetStateAction<Point[]>>;
type NoteState = { id: number };
type SetNotesFunc = React.Dispatch<React.SetStateAction<NoteState[]>>;
// 定義域の外では null を返す実数関数
type PartialFunc = (x: number) => number | null;
// グラフ曲線の断片
type Curve = {
  f: (x: number) => number; // 曲線の関数
  df: (x: number) => number; // 導関数
  d2f: (x: number) => number; // 二次導関数
  from: number; // 定義域の始まり
  to: number; // 定義域の終わり
  min: number; // 定義域内での最小値
  max: number; // 定義域内での最大値
};
// グラフ全体のデータ
type Graph = {
  f: PartialFunc; // 曲線の関数（定義域外では null を返す）
  df: PartialFunc; // 導関数（定義域外では null を返す）
  d2f: PartialFunc; // 二次導関数（定義域外では null を返す）
  from: number | null; // 定義域の始まり（定義域なしの場合は null）
  to: number | null; // 定義域の終わり（定義域なしの場合は null）
  min: number | null; // 定義域内での最小値（定義域なしの場合は null）
  max: number | null; // 定義域内での最大値（定義域なしの場合は null）
  points: Point[]; // 標本点
};
