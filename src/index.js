import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App.jsx";
import "./app/layout/styles.css";

const rootEl = document.getElementById("root");

const render = () => {
  ReactDOM.render(<App />, rootEl);
};

if (module.hot) {
  module.hot.accept("./app/layout/App.jsx", () => setTimeout(render));
}

render();
