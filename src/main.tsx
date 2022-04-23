import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SongProvider } from "./state/SongContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SongProvider>
      <App />
    </SongProvider>
  </React.StrictMode>
);
