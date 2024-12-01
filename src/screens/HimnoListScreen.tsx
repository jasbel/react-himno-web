import { useCallback, useEffect } from "react";
import { titleApp } from "../res/constant";
import { ISong } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { ERoutes } from "../res/enum";
import HimnoList from "@/components/HimnoList";
import { useDinamicSong } from "@/hooks/useDinamicSong";

const HimnoListScreen = () => {
  const navigate = useNavigate();
  const { changeSongBySearch, songsSearch, getSongs } = useDinamicSong();

  const handlePress = useCallback(
    (himno: ISong) => {
      navigate('/' + ERoutes.addHimno, { state: { himno } });
    },
    [navigate]
  );

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <>
      <Hero title={titleApp} hrefBefore={"/"} hiddenFS />

      <HimnoList
        changeSongBySearch={changeSongBySearch}
        hasFavorite={false}
        songsSearch={songsSearch}
        handlePress={handlePress}
      />
    </>
  );
};

export default HimnoListScreen;
