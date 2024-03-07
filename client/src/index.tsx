import React from "react";
import {createRoot, Root} from 'react-dom/client';
import App from "@/components/app";

const container: HTMLElement | null = document.getElementById('root');

const root: Root = createRoot(container!);

const app: React.JSX.Element = <App/>;

root.render(app);
