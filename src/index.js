import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux-store";
import App from "./App";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

const domNode = document.getElementById("root");
const root = ReactDOM.createRoot(domNode);
root.render(app);
