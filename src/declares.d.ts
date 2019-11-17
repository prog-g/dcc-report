type Point = { x: number; y: number };
type SetPointsFunc = React.Dispatch<React.SetStateAction<Point[]>>;
type Note = { id: number; x: number | null };
type SetNotesFunc = React.Dispatch<React.SetStateAction<Note[]>>;
type BindingTarget = number | null;
type SetBindingTargetFunc = React.Dispatch<React.SetStateAction<BindingTarget>>;
type GraphFunc = (x: number) => number | null;
type Curve = {
  f: GraphFunc;
  df: GraphFunc;
  d2f: GraphFunc;
  start: number;
  end: number;
  min: number;
  max: number;
};
type Graph = {
  f: GraphFunc;
  df: GraphFunc;
  d2f: GraphFunc;
  start: number | null;
  end: number | null;
  min: number | null;
  max: number | null;
  points: Point[];
};
