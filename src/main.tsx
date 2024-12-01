import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SettingProvider } from "./state/SettingContext";
import { SongProvider } from "./state/SongContext";
import { SongNewProvider } from "./state/SongNewContext";
import { SongNewQuechuaProvider } from "./state/SongNewQuechuaContext";
import { AddProvider } from "./state/AddContext";
import { SongDinamicProvider } from "./state/SongDinamicContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SongNewProvider>
      <SongProvider>
        <SongDinamicProvider>
          <SongNewQuechuaProvider>
            <SettingProvider>
              <AddProvider>
                <App />
              </AddProvider>
            </SettingProvider>
          </SongNewQuechuaProvider>
        </SongDinamicProvider>
      </SongProvider>
    </SongNewProvider>
  </React.StrictMode>
);
