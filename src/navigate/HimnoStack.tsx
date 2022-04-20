import React from "react";
import HimnoScreen from "../screens/HimnoScreen";
import HimnoSongScreen from "../screens/HimnoSongScreen";
import Colors from "../res/colors";
import HimnoHomeScreen from "../screens/HimnoHomeScreen";

import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";

const HimnoStack = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HimnoHomeScreen />}>
            <Route index element={<HimnoHomeScreen />} />
            <Route path="himno-home" element={<HimnoHomeScreen />} />
            {/* <Route path="HimnoScreen" element={<HimnoScreen />} /> */}
            {/* <Route path="HimnoSongScreen" element={<HimnoSongScreen />} /> */}
            {/* <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}
          </Route>
          <Route path="himno" element={<HimnoScreen />} />
          <Route path="himno-song" element={<HimnoSongScreen />} />
        </Routes>
      </BrowserRouter>

      {/* <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: Colors.bkgBlack,
            shadowColor: Colors.bkgDark,
          },
          headerTintColor: Colors.txtLight,
        }}
      >
        <Stack.Screen name="HimnoHomeScreen" component={HimnoHomeScreen} />
        <Stack.Screen name="HimnoScreen" component={HimnoScreen} />
        <Stack.Screen name="HimnoSongScreen" component={HimnoSongScreen} />
      </Stack.Navigator> */}
    </>
  );
};

export default HimnoStack;
