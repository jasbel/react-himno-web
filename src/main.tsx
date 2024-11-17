import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SettingProvider } from "./state/SettingContext";
import { SongProvider } from "./state/SongContext";
import { SongNewProvider } from "./state/SongNewContext";
import { SongNewQuechuaProvider } from "./state/SongNewQuechuaContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SongNewProvider>
      <SongProvider>
        <SongNewQuechuaProvider>
          <SettingProvider>
            <App />
          </SettingProvider>
        </SongNewQuechuaProvider>
      </SongProvider>
    </SongNewProvider>
  </React.StrictMode>
);
