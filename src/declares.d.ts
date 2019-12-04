type Point = { x: number; y: number };
type SetPointsFunc = React.Dispatch<React.SetStateAction<Point[]>>;
type NoteState = { id: number };
type SetNotesFunc = React.Dispatch<React.SetStateAction<NoteState[]>>;
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
