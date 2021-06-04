import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./app/store/configureStore";
import App from "./app/layout/App.jsx";
import "semantic-ui-css/semantic.min.css";
import "./app/layout/styles.css";
import ScrollToTop from "./app/helpers/ScrollToTop";

const store = configureStore();

const rootEl = document.getElementById("root");

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept("./app/layout/App.jsx", () => setTimeout(render));
}

render();
