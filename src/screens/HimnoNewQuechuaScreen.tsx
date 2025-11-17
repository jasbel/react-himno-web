import { useCallback, useContext } from "react";
import { titleApp } from "../res/constant";
import { ISong } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { ERoutes } from "../res/enum";
import HimnoList from "@/components/HimnoList";
import { SongQuechuaContext } from "@/state/SongNewQuechuaContext";

const HimnoNewQuechuaScreen = () => {
  const navigate = useNavigate();
  // const { songFavorites, changeSongBySearch, songsSearch } = useSongQuechua();
  const {songsSearch,  songFavorites, changeSongBySearch} = useContext(SongQuechuaContext)

  const handlePress = useCallback(
    (himno: ISong) => {
      navigate('/' + ERoutes.itemQuechua, { state: { himno } });
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

export default HimnoNewQuechuaScreen;
