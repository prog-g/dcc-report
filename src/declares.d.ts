// aliases
type SetStateFunc<T> = React.Dispatch<React.SetStateAction<T>>;

// グラフの点
type Point = { x: number; y: number };

type Points = Point[];
type SetPoints = SetStateFunc<Points>;

// メモのデータ
// 内容のデータはメモで閉じているのでメモが持ち、y 座標などは x から計算できる
type Note = {
  id: number; // メモの識別子
  x: number | null; // メモと紐づいた点の x 座標
};

type Notes = Note[];
type SetNotes = SetStateFunc<Notes>;

// 選択中のメモの識別子
type BindingTargetId = Note["id"] | null;
type SetBindingTargetId = SetStateFunc<BindingTargetId>;

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
