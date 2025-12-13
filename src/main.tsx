import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SettingProvider } from "./state/SettingContext";
import { SongNewProvider } from "./state/SongNewContext";
import { SongQchProvider } from "./state/SongQchContext";
import { AddProvider } from "./state/AddContext";
import { SongDinamicProvider } from "./state/SongDinamicContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SongNewProvider>
        <SongDinamicProvider>
          <SongQchProvider>
            <SettingProvider>
              <AddProvider>
                <App />
              </AddProvider>
            </SettingProvider>
          </SongQchProvider>
        </SongDinamicProvider>
    </SongNewProvider>
  </React.StrictMode>
);
