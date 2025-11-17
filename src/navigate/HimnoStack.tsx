import HimnoHomeScreen from "../screens/HimnoHomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddHimnoScreen from "../screens/AddHimnoScreen";
import HimnoNewScreen from "../screens/HimnoNewScreen";
import HimnoSongScreen from "../screens/HimnoSong2Screen";
import HimnoNewQuechuaScreen from "../screens/HimnoNewQuechuaScreen";
import HimnoSongQuechuaScreen from "../screens/HimnoSongQuechuaScreen";
import { ERoutes } from "../res/enum";
import HimnoListScreen from "@/screens/HimnoListScreen";
import EditHimnoScreen from "@/screens/EditHimnoScreen";
import { routeList } from "@/res/constant";
import HimnoListsScreen from "@/screens/HimnoListsScreen";
import LayoutGlobal from "@/layout/LayoutGlobal";

const HimnoStack = () => {
    
  return (
    <LayoutGlobal>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HimnoHomeScreen admin={false}/>}>
          <Route index element={<HimnoHomeScreen  admin={false}/>} />
          <Route path={ERoutes.principal} element={<HimnoHomeScreen admin={false} />} />
        </Route>
        <Route path={ERoutes.himnos} element={<HimnoNewScreen />} />
        <Route path={ERoutes.homeQuechua} element={<HimnoNewQuechuaScreen />} />
        <Route path={ERoutes.homeList} element={<HimnoListScreen />} />
        <Route path={ERoutes.homeLists} element={<HimnoListsScreen />} />
        <Route path={ERoutes.item}  element={<HimnoSongScreen />} />
        <Route path={ERoutes.itemQuechua}  element={<HimnoSongQuechuaScreen />} />
        <Route path={ERoutes.addHimno}  element={<AddHimnoScreen />} />
        <Route path={routeList.edit(':id')}  element={<EditHimnoScreen />} />
      </Routes>
    </BrowserRouter>
    </LayoutGlobal>
  );
};

export default HimnoStack;
