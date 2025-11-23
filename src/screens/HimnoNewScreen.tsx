import { useCallback, useContext } from "react";
import { titleApp } from "../res/constant";
import { ISong } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { ERoutes } from "../res/enum";
import HimnoList from "@/components/HimnoList";
import { SongNewContext } from "@/state/SongNewContext";
import { getSongV1Item } from "@/api/songLocalService";
import { uuid } from "@/res/helpers";

const HimnoNewScreen = () => {
  const navigate = useNavigate();
  const {songFavorites, changeSongBySearch, songAllFilter: songsSearch} = useContext(SongNewContext)

  const handlePress = useCallback(
    (himno: ISong) => {
      navigate('/' + ERoutes.item, { state: { himno } });
    },
    [navigate]
  );

  const handlePressPre = 
    async (himno: ISong) => {
      let item: ISong = himno
      if (himno.filename) {
        // debugger
        const _item = await getSongV1Item(himno.filename)
        item = {..._item, paragraphs:  _item.paragraphs.map(it =>  ({...it, id: uuid(), chorusPos: []}))}
      }
      handlePress(item) 
      
    }

  return (
    <div className="himnonewscreen">
      <Hero title={titleApp} hrefBefore={"/"} hiddenFS />

      <HimnoList
        changeSongBySearch={changeSongBySearch}
        hasFavorite={!!songFavorites.length}
        songsSearch={songsSearch}
        handlePress={handlePressPre}
      />
    </div>
  );
};

export default HimnoNewScreen;
