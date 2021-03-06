import React from "react";
import Graph from "./Graph";
import { makeGraph } from "./lib/graph";
import { newNote } from "./lib/note";
import { download } from "./lib/util";
import NameEntry from "./NameEntry";
import NoteList from "./NoteList";

const App: React.FunctionComponent = () => {
  const [points, setPoints] = React.useState<Points>([]);
  const [notes, setNotes] = React.useState([newNote()]);
  const [bindingTargetId, setBindingTargetId] = React.useState<BindingTargetId>(
    null
  );
  const graph = makeGraph(points);

  return (
    <>
      <Graph
        graph={graph}
        setPoints={setPoints}
        notes={notes}
        setNotes={setNotes}
        bindingTargetId={bindingTargetId}
        setBindingTargetId={setBindingTargetId}
      />
      <NoteList
        graph={graph}
        notes={notes}
        setNotes={setNotes}
        setBindingTargetId={setBindingTargetId}
      />
      <NameEntry />
      <button className="download" onClick={download}>
        HTMLでダウンロード
      </button>
    </>
  );
};

export default App;
