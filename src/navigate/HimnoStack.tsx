import HimnoScreen from "../screens/HimnoScreen";
import HimnoSongScreen from "../screens/HimnoSongScreen";
import HimnoHomeScreen from "../screens/HimnoHomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddHimnoScreen from "../screens/AddHimnoScreen";
import HimnoNewScreen from "../screens/HimnoNewScreen";
import HimnoSong2Screen from "../screens/HimnoSong2Screen";

const HimnoStack = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HimnoHomeScreen />}>
          <Route index element={<HimnoHomeScreen />} />
          <Route path="himno-home" element={<HimnoHomeScreen />} />
        </Route>
        <Route path="himno" element={<HimnoScreen />} />
        <Route path="himnos" element={<HimnoNewScreen />} />
        <Route path="himno-song" element={<HimnoSongScreen />} />
        <Route path="himno-song-new" element={<HimnoSong2Screen />} />
        <Route path="add-himno" element={<AddHimnoScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default HimnoStack;
