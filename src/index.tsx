import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";

ReactDOM.render(<App />, document.getElementById("app"));

// ページを閉じようとしたときに確認プロンプトを表示する
// see https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event#Examples
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = "";
});
