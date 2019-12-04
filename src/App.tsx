import React from "react";
import Graph from "./Graph";
import { download, makeGraph, newNote } from "./lib";
import Timeline from "./Timeline";

const App: React.FunctionComponent = () => {
  const [points, setPoints] = React.useState<Point[]>([]);
  const [notes, setNotes] = React.useState([newNote([])]);
  const [bindingTarget, setBindingTarget] = React.useState<BindingTarget>(null);
  const graph = makeGraph(points);
  return (
    <>
      <Graph
        graph={graph}
        setPoints={setPoints}
        notes={notes}
        setNotes={setNotes}
        bindingTarget={bindingTarget}
        setBindingTarget={setBindingTarget}
      />
      <Timeline
        f={graph.f}
        df={graph.df}
        notes={notes}
        setNotes={setNotes}
        setBindingTarget={setBindingTarget}
      />
      <button onClick={download}>Download</button>
    </>
  );
};

export default App;
