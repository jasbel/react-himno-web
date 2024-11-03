import HimnoScreen from "../screens/HimnoScreen";
import HimnoSongScreen from "../screens/HimnoSongScreen";
import HimnoHomeScreen from "../screens/HimnoHomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddHimnoScreen from "../screens/AddHimnoScreen";
import HimnoNewScreen from "../screens/HimnoNewScreen";
import HimnoSong2Screen from "../screens/HimnoSong2Screen";
import HimnoNewQuechuaScreen from "../screens/HimnoNewQuechuaScreen";
import HimnoSongQuechuaScreen from "../screens/HimnoSongQuechuaScreen";
import { ERoutes } from "../res/enum";

const HimnoStack = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HimnoHomeScreen />}>
          <Route index element={<HimnoHomeScreen />} />
          <Route path={ERoutes.principal} element={<HimnoHomeScreen />} />
        </Route>
        <Route path={ERoutes.homeOld} element={<HimnoScreen />} />
        <Route path={ERoutes.home} element={<HimnoNewScreen />} />
        <Route path={ERoutes.homeQuechua} element={<HimnoNewQuechuaScreen />} />
        <Route path={ERoutes.itemOld} element={<HimnoSongScreen />} />
        <Route path={ERoutes.item}  element={<HimnoSong2Screen />} />
        <Route path={ERoutes.itemQuechua}  element={<HimnoSongQuechuaScreen />} />
        <Route path={ERoutes.addHimno}  element={<AddHimnoScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default HimnoStack;
