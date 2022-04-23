import React from "react";
import HimnoScreen from "../screens/HimnoScreen";
import HimnoSongScreen from "../screens/HimnoSongScreen";
import HimnoHomeScreen from "../screens/HimnoHomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Colors from "../res/colors";
// import { render } from "react-dom";
// import App from "../App";

const HimnoStack = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HimnoHomeScreen />}>
          <Route index element={<HimnoHomeScreen />} />
          <Route path="himno-home" element={<HimnoHomeScreen />} />
        </Route>
        <Route path="himno" element={<HimnoScreen />} />
        <Route path="himno-song" element={<HimnoSongScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default HimnoStack;
