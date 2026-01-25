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

// Service Worker Registration for Offline Support
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Nueva versión disponible. ¿Desea actualizar?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("La aplicación está lista para funcionar sin conexión a internet");
    // Dispatch event to show offline ready indicator
    window.dispatchEvent(new CustomEvent('offline-ready'));
  },
  onRegistered(registration) {
    console.log('Service Worker registrado:', registration);
    if (registration) {
      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000); // Check every hour
    }
  },
  onRegisterError(error) {
    console.error('Error al registrar el Service Worker:', error);
  },
});

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
