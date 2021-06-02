import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const rootEl = document.getElementById("root");

const render = () => {
  ReactDOM.render(<App />, rootEl);
};

if (module.hot) {
  module.hot.accept("./App", () => setTimeout(render));
}

render();
