type Point = { x: number; y: number };
type SetPointsFunc = React.Dispatch<React.SetStateAction<Point[]>>;
type NoteState = { id: number };
type SetNotesFunc = React.Dispatch<React.SetStateAction<NoteState[]>>;
type PartialFunc = (x: number) => number | null;
type Curve = {
  f: (x: number) => number;
  df: (x: number) => number;
  d2f: (x: number) => number;
  from: number;
  to: number;
  min: number;
  max: number;
};
type Graph = {
  f: PartialFunc;
  df: PartialFunc;
  d2f: PartialFunc;
  from: number | null;
  to: number | null;
  min: number | null;
  max: number | null;
  points: Point[];
};
