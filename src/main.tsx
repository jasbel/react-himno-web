import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SettingProvider } from "./state/SettingContext";
import { SongNewProvider } from "./state/SongNewContext";
import { SongNewQuechuaProvider } from "./state/SongNewQuechuaContext";
import { AddProvider } from "./state/AddContext";
import { SongDinamicProvider } from "./state/SongDinamicContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SongNewProvider>
        <SongDinamicProvider>
          <SongNewQuechuaProvider>
            <SettingProvider>
              <AddProvider>
                <App />
              </AddProvider>
            </SettingProvider>
          </SongNewQuechuaProvider>
        </SongDinamicProvider>
    </SongNewProvider>
  </React.StrictMode>
);
