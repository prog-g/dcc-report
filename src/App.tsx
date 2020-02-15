import React from "react";
import Graph from "./Graph";
import { makeGraph } from "./lib/graph";
import { newNote } from "./lib/note";
import { download } from "./lib/util";
import NoteList from "./NoteList";

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
      <NoteList
        graph={graph}
        notes={notes}
        setNotes={setNotes}
        setBindingTarget={setBindingTarget}
      />
      <button onClick={download}>Download</button>
    </>
  );
};

export default App;
