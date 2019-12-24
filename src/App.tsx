import React from "react";
import Graph from "./Graph";
import { makeGraph } from "./lib/graph";
import { newNote } from "./lib/note";
import { download } from "./lib/util";
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
        graph={graph}
        notes={notes}
        setNotes={setNotes}
        setBindingTarget={setBindingTarget}
      />
      <div className="download-menu">
        <button onClick={download}>HTMLでダウンロード</button>
      </div>
    </>
  );
};

export default App;
