import React from "react";
import { download } from "./lib";

const App: React.FunctionComponent = () => (
  <button onClick={download}>download</button>
);

export default App;
