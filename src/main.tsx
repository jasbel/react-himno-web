import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SettingProvider } from "./state/SettingContext";
import { SongNewProvider } from "./state/SongNewContext";
import { SongQchProvider } from "./state/SongQchContext";
import { AddProvider } from "./state/AddContext";
import { SongDinamicProvider } from "./state/SongDinamicContext";
import { AuthProvider } from "./state/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
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
    </AuthProvider>
  </React.StrictMode>
);
