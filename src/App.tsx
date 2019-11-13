import React from "react";
import Graph from "./Graph";
import { download } from "./lib";
import Timeline from "./Timeline";

const App: React.FunctionComponent = () => {
  const [notes, setNotes] = React.useState([{ id: 0 }]);
  return (
    <>
      <Graph />
      <Timeline notes={notes} setNotes={setNotes} />
      <button onClick={download}>download</button>
    </>
  );
};

export default App;
