import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/App.tsx";
import { CitiesProvider, AuthProvider } from "@/providers";
import "react-datepicker/dist/react-datepicker.css";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CitiesProvider>
        <App />
      </CitiesProvider>
    </AuthProvider>
  </React.StrictMode>
);
