import HimnoHomeScreen from "./screens/HimnoHomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddHimnoScreen from "./screens/AddHimnoScreen";
import HimnoNewScreen from "./screens/HimnoNewScreen";
import HimnoSongScreen from "./screens/HimnoSong2Screen";
import HimnoNewQuechuaScreen from "./screens/HimnoNewQuechuaScreen";
import HimnoSongQuechuaScreen from "./screens/HimnoSongQuechuaScreen";
import { ERoutes } from "@/utils/enum";
import HimnoListScreen from "@/screens/HimnoListScreen";
import EditHimnoScreen from "@/screens/EditHimnoScreen";
import { routeList } from "@/utils/constant";
import HimnoListsScreen from "@/screens/HimnoListsScreen";
import LayoutGlobal from "@/layout/LayoutGlobal";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import ProtectedRoute from "@/components/ProtectedRoute";

const HimnoStack = () => {
    
  return (
    <BrowserRouter>
      <LayoutGlobal>
        <Routes>
          <Route path="/" element={<HimnoHomeScreen admin={false}/>}>
            <Route index element={<HimnoHomeScreen  admin={false}/>} />
            <Route path={ERoutes.principal} element={<HimnoHomeScreen admin={false} />} />
          </Route>
          <Route path="/login" element={<LoginScreen />} />
          <Route path={ERoutes.register} element={<RegisterScreen />} />
          <Route path={ERoutes.forgotPassword} element={<ForgotPasswordScreen />} />
          <Route path={ERoutes.changePassword} element={<ChangePasswordScreen />} />
          <Route path={ERoutes.himnos} element={<HimnoNewScreen />} />
          <Route path={ERoutes.homeQuechua} element={<HimnoNewQuechuaScreen />} />
          <Route path={ERoutes.homeList} element={<HimnoListScreen />} />
          <Route path={ERoutes.homeLists} element={<HimnoListsScreen />} />
          <Route path={ERoutes.item + '/:id'}  element={<HimnoSongScreen />} />
          <Route path={ERoutes.itemQuechua + '/:id'}  element={<HimnoSongQuechuaScreen />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path={ERoutes.addHimno}  element={<AddHimnoScreen />} />
            <Route path={routeList.edit(':id')}  element={<EditHimnoScreen />} />
          </Route>
        </Routes>
      </LayoutGlobal>
    </BrowserRouter>
  );
};

export default HimnoStack;
