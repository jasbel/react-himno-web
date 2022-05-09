import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./config/theme";
import "./index.css";
import { SongProvider } from "./state/SongContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <SongProvider>
      <App />
    </SongProvider>
    </ChakraProvider>
  </React.StrictMode>
);
