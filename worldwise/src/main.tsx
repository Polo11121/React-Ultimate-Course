import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/App.tsx";
import { CitiesProvider } from "@/providers";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CitiesProvider>
      <App />
    </CitiesProvider>
  </React.StrictMode>
);
