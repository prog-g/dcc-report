import React from "react";
import Timeline from "./Timeline";
import { download } from "./lib";

const App: React.FunctionComponent = () => {
  const [notes, setNotes] = React.useState([
    {
      id: 0,
      content: "note1",
    },
    {
      id: 1,
      content: "note2",
    }
  ]);
  return (
    <>
      <Timeline notes={notes} setNotes={setNotes}/>
      <button onClick={download}>download</button>
    </>
  )
};

export default App;
