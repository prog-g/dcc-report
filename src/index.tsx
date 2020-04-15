import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";

ReactDOM.render(<App />, document.getElementById("app"));

// ページを閉じようとしたときにアラートを出す
// null や undefind に評価される値ではアラートが出ないので true をセットする
window.addEventListener("beforeunload", (e): void => {
  e.returnValue = true;
});
