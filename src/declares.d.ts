type Point = { x: number; y: number };
type SetPointsFunc = React.Dispatch<React.SetStateAction<Point[]>>;
type GraphFunction = (x: number) => number | null;
type Note = { id: number; x: number | null };
type SetNotesFunc = React.Dispatch<React.SetStateAction<Note[]>>;
type BindingTarget = number | null;
type SetBindingTargetFunc = React.Dispatch<React.SetStateAction<BindingTarget>>;
