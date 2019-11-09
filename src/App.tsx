import React from "react";
import Timeline from "./Timeline";
import { download } from "./lib";
import Canvas from "./Canvas";

const App: React.FunctionComponent = () => {
  const [notes, setNotes] = React.useState([{ id: 0 }]);
  return (
    <>
      <Canvas/>
      <Timeline notes={notes} setNotes={setNotes} />
      <button onClick={download}>download</button>
    </>
  );
};

export default App;
