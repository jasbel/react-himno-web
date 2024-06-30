import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./config/theme";
import "./index.css";
import { SettingProvider } from "./state/SettingContext";
import { SongProvider } from "./state/SongContext";
import { SongNewProvider } from "./state/SongNewContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SongNewProvider>
        <SongProvider>
          <SettingProvider>
            <App />
          </SettingProvider>
        </SongProvider>
      </SongNewProvider>
    </ChakraProvider>
  </React.StrictMode>
);
