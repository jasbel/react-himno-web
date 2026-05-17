import { useCallback, useContext } from "react";
import { titleApp, routeList } from "@/utils/constant";
import { ISongModel } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { ERoutes } from "@/utils/enum";
import HimnoList from "@/components/HimnoList";
import { SongQchContext } from "@/state/SongQchContext";

const HimnoNewQuechuaScreen = () => {
  const navigate = useNavigate();
  const {songAllFilter: songsSearch, changeSongBySearch} = useContext(SongQchContext)

  const handlePress = useCallback(
    (himno: ISongModel) => {
      navigate(routeList.songQuechua(himno.id), { state: { himno } });
    },
    [navigate]
  );

  return (
    <>
      <Hero title={titleApp} hrefBefore={"/"} hiddenFS />

      <HimnoList
        changeSongBySearch={changeSongBySearch}
        songsSearch={songsSearch}
        handlePress={handlePress}
      />
    </>
  );
};

export default HimnoNewQuechuaScreen;
