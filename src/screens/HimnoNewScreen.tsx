import { useCallback, useContext } from "react";
import { titleApp } from "../res/constant";
import { ISong } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { ERoutes } from "../res/enum";
import HimnoList from "@/components/HimnoList";
import { SongContext } from "@/state/SongNewContext";

const HimnoNewScreen = () => {
  const navigate = useNavigate();
  const {songFavorites, changeSongBySearch, songsSearch} = useContext(SongContext)

  const handlePress = useCallback(
    (himno: ISong) => {
      navigate('/' + ERoutes.item, { state: { himno } });
    },
    [navigate]
  );

  return (
    <>
      <Hero title={titleApp} hrefBefore={"/"} hiddenFS />

      <HimnoList
        changeSongBySearch={changeSongBySearch}
        hasFavorite={!!songFavorites.length}
        songsSearch={songsSearch}
        handlePress={handlePress}
      />
    </>
  );
};

export default HimnoNewScreen;
