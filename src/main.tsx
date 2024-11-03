import { ChakraProvider } from "@chakra-ui/react";
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
    <ChakraProvider>
      <SongNewQuechuaProvider>
      <SongNewProvider>
        <SongProvider>
          <SettingProvider>
            <App />
          </SettingProvider>
        </SongProvider>
      </SongNewProvider>
      </SongNewQuechuaProvider>
    </ChakraProvider>
  </React.StrictMode>
);
