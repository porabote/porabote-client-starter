import React from "react";
import {createRoot, Root} from 'react-dom/client';
import { Provider } from "react-redux";
import store from "@/redux-store";
import App from "./components/app";

const container: HTMLElement | null = document.getElementById('root');

const root: Root = createRoot(container!);

const app: React.JSX.Element = (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(app);
