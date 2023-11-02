import React from "react";
import ReactDOM from "react-dom/client";
import { BlogProvider } from "context/BlogProvider";
import { App } from "App";
import "style.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BlogProvider>
      <App />
    </BlogProvider>
  </React.StrictMode>
);
