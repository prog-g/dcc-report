import React from "react";
import Graph from "./Graph";
import { download, makeGraphCurve, newNote } from "./lib";
import Timeline from "./Timeline";

const App: React.FunctionComponent = () => {
  const [points, setPoints] = React.useState<Point[]>([]);
  const [notes, setNotes] = React.useState([newNote([])]);
  const [bindingTarget, setBindingTarget] = React.useState<BindingTarget>(null);
  const graphCurve = makeGraphCurve(points);
  return (
    <>
      <Graph
        points={points}
        setPoints={setPoints}
        graphCurve={graphCurve}
        setNotes={setNotes}
        bindingTarget={bindingTarget}
        setBindingTarget={setBindingTarget}
      />
      <Timeline
        graphCurve={graphCurve}
        notes={notes}
        setNotes={setNotes}
        setBindingTarget={setBindingTarget}
      />
      <button onClick={download}>Download</button>
    </>
  );
};

export default App;
